// --- KONFIGURACE API ---
const API_URL = 'https://delta-api-lovat.vercel.app';
const API_KEY = '73d96de7fedb250f05eb1c301ca1a3203463ae8fbec08f93';

// --- VÝBĚR HTML ELEMENTŮ ---
const tableBody = document.getElementById('table-body');
const form = document.getElementById('user-form');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const formMsg = document.getElementById('form-msg');

const filterClassInput = document.getElementById('filter-class');
const btnFilterClass = document.getElementById('btn-filter-class');
const filterSubjectInput = document.getElementById('filter-subject');
const btnFilterSubject = document.getElementById('btn-filter-subject');
const btnFilterReset = document.getElementById('btn-filter-reset');

let currentUsers = [];

// --- ÚKOL 1: ZOBRAZENÍ DAT (GET) ---
async function loadUsers(endpoint = '/api/users') {
    tableBody.innerHTML = '<tr><td colspan="4" class="p-8 text-center text-slate-500 italic">Načítám data z API...</td></tr>';
    try {
        const response = await fetch(API_URL + endpoint);

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || `Chyba serveru: ${response.status}`);
        }

        const data = await response.json();
        currentUsers = Array.isArray(data) ? data : [];

        tableBody.innerHTML = '';

        if (currentUsers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="p-8 text-center text-slate-500 italic">Žádní uživatelé nenalezeni.</td></tr>';
            return;
        }

        currentUsers.forEach(user => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors';

            const classOrSubject = user.classId
                ? `<span class="font-medium">${user.classId}</span>`
                : user.subject
                    ? `<span class="text-slate-500 italic">${user.subject}</span>`
                    : '<span class="text-slate-400">—</span>';

            const roleBadge = user.role === 'teacher'
                ? `<span class="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">Učitel</span>`
                : `<span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">Student</span>`;

            tr.innerHTML = `
                <td class="p-4 font-medium">${user.name}</td>
                <td class="p-4 text-slate-600">${classOrSubject}</td>
                <td class="p-4">${roleBadge}</td>
                <td class="p-4 text-right space-x-2">
                    <button
                        onclick="prepareEdit('${user.id}')"
                        class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1.5 px-3 rounded-lg text-sm transition-colors">
                        Upravit
                    </button>
                    <button
                        onclick="deleteUser('${user.id}')"
                        class="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-1.5 px-3 rounded-lg text-sm transition-colors">
                        Smazat
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

    } catch (error) {
        console.error('Chyba načítání dat:', error);
        tableBody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-red-500">Chyba: ${error.message}</td></tr>`;
    }
}

// --- ÚKOL 2 & 4: VYTVÁŘENÍ (POST) A ÚPRAVA (PUT) ---
form.addEventListener('submit', async (udalost) => {
    udalost.preventDefault();

    const id = document.getElementById('user-id').value;
    const name = document.getElementById('name').value.trim();
    const classId = document.getElementById('classId').value.trim();
    const subject = document.getElementById('subject').value.trim();

    const isEditing = id !== '';
    const url = isEditing
        ? `${API_URL}/api/users/${id}`
        : `${API_URL}/api/students`;
    const method = isEditing ? 'PUT' : 'POST';

    const body = { name, classId };
    if (subject) body.subject = subject;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || `Chyba serveru: ${response.status}`);
        }

        showMessage(
            isEditing ? '✅ Uživatel byl úspěšně upraven.' : '✅ Student byl úspěšně přidán.',
            'text-green-600'
        );

        // Reset formuláře
        form.reset();
        document.getElementById('user-id').value = '';
        formTitle.innerText = 'Přidat studenta';
        btnSubmit.innerText = 'Vytvořit';
        btnCancel.classList.add('hidden');

        loadUsers();

    } catch (error) {
        showMessage(`❌ ${error.message}`, 'text-red-600');
    }
});

// --- ÚKOL 3: MAZÁNÍ (DELETE) ---
async function deleteUser(id) {
    if (!confirm('Opravdu chcete smazat tohoto uživatele?')) return;

    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || `Chyba serveru: ${response.status}`);
        }

        showMessage('✅ Uživatel byl smazán.', 'text-green-600');
        loadUsers();

    } catch (error) {
        showMessage(`❌ ${error.message}`, 'text-red-600');
    }
}

// --- ÚKOL 5: FILTROVÁNÍ ---

// Hledání podle TŘÍDY
btnFilterClass.addEventListener('click', () => {
    const classId = filterClassInput.value.trim();
    if (classId) {
        loadUsers(`/api/classes/${encodeURIComponent(classId)}/students`);
    }
});

// Hledání podle PŘEDMĚTU
btnFilterSubject.addEventListener('click', () => {
    const subject = filterSubjectInput.value.trim();
    if (subject) {
        loadUsers(`/api/subjects/${encodeURIComponent(subject)}/users`);
    }
});

// Reset filtru
btnFilterReset.addEventListener('click', () => {
    filterClassInput.value = '';
    filterSubjectInput.value = '';
    loadUsers();
});


// --- POMOCNÉ FUNKCE (Již připravené) ---

window.prepareEdit = function(id) {
    const user = currentUsers.find(u => u.id === id);
    if (!user) return;

    document.getElementById('user-id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('classId').value = user.classId || '';
    document.getElementById('subject').value = user.subject || '';

    formTitle.innerText = 'Upravit uživatele';
    btnSubmit.innerText = 'Uložit změny';
    btnCancel.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

btnCancel.addEventListener('click', () => {
    form.reset();
    document.getElementById('user-id').value = '';
    formTitle.innerText = 'Přidat studenta';
    btnSubmit.innerText = 'Vytvořit';
    btnCancel.classList.add('hidden');
});

function showMessage(text, colorClass) {
    formMsg.className = `text-sm mt-3 font-medium text-center ${colorClass}`;
    formMsg.innerText = text;
    setTimeout(() => formMsg.innerText = '', 4000);
}

window.addEventListener('load', () => loadUsers());