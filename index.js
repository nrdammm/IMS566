document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. STATE MANAGEMENT ---
    let internsData = [];
    let myChart = null;
    let barChart = null;

    // A. INTERNS DATA (LocalStorage)
    const defaultData = [
        { id: 2025001, name: 'Ali Bin Abu', company: 'Petronas', status: 'Placed' },
        { id: 2025002, name: 'Sarah Tan', company: '-', status: 'Pending' },
        { id: 2025003, name: 'Muthu Kumar', company: 'Maybank', status: 'Placed' },
        { id: 2025004, name: 'Ah Chong', company: '-', status: 'Pending' },
        { id: 2025005, name: 'Siti Aminah', company: 'Telekom', status: 'Placed' },
        { id: 2025006, name: 'John Doe', company: 'Petronas', status: 'Placed' }
    ];

    // B. COMPANIES DATA (Static for Blog Feed)
    const companiesData = [
        {
            name: "Petronas Digital",
            industry: "Oil & Gas / Tech",
            location: "KLCC, Kuala Lumpur",
            desc: "Join our digital transformation journey. We are looking for interns passionate about AI, Data Science, and Software Engineering.",
            jobs: ["Software Engineer", "Data Analyst", "UI/UX Intern"],
            slots: 5,
            icon: "business-outline",
            link: "https://www.petronas.com/"
        },
        {
            name: "Shopee Malaysia",
            industry: "E-Commerce",
            location: "Mid Valley, KL",
            desc: "Experience the fast-paced world of e-commerce. We have openings in our frontend and backend teams.",
            jobs: ["Frontend Developer", "Backend Developer"],
            slots: 2,
            icon: "bag-handle-outline",
            link: "https://careers.shopee.com.my/about"
        },
        {
            name: "Telekom Malaysia",
            industry: "Telecommunications",
            location: "Bangsar South",
            desc: "Connect the nation with us. Seeking network engineering students for a 6-month industrial training program.",
            jobs: ["Network Engineer", "System Admin"],
            slots: 10,
            icon: "wifi-outline",
            link: "https://tmcareer.tm.com.my/home"
        },
        {
            name: "Maybank",
            industry: "Banking / FinTech",
            location: "Menara Maybank",
            desc: "Be part of the leading financial institution in Malaysia. Openings available in our FinTech innovation lab.",
            jobs: ["Java Developer", "Security Analyst"],
            slots: 4,
            icon: "cash-outline",
            link: "https://www.maybank.com/investment-banking/career.page"
        }
    ];

    function loadData() {
        const stored = localStorage.getItem('internsData');
        if (stored) {
            internsData = JSON.parse(stored);
        } else {
            internsData = defaultData; 
            saveData(); 
        }
        updateUI(); 
    }

    function saveData() {
        localStorage.setItem('internsData', JSON.stringify(internsData));
    }

    window.resetSystemData = function() {
        if(confirm("Reset all data?")) {
            localStorage.clear();
            loadData();
        }
    };

    // --- 2. UI UPDATES ---
    function updateUI() {
        const total = internsData.length;
        const placed = internsData.filter(i => i.status === 'Placed').length;
        const pending = internsData.filter(i => i.status === 'Pending').length;

        document.getElementById('count-total').innerText = total;
        document.getElementById('count-placed').innerText = placed;
        document.getElementById('count-pending').innerText = pending;

        updateMainChart(placed, pending);
        updateBarChart();
        renderTable();
        renderCompanyFeed();
    }

    // Render Interns Table
    function renderTable() {
        const tbody = document.getElementById('internTableBody');
        tbody.innerHTML = ''; 

        internsData.forEach((intern, index) => {
            const badgeClass = intern.status === 'Placed' ? 'bg-success' : 'bg-warning text-dark';
            const displayCompany = intern.status === 'Placed' && (!intern.company || intern.company === '-') 
                                   ? 'Unknown' : (intern.company || '-');

            const row = `
                <tr>
                    <td>${intern.id}</td>
                    <td>${intern.name}</td>
                    <td>${displayCompany}</td>
                    <td><span class="badge ${badgeClass}">${intern.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteIntern(${index})">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    // Render Company Blog Feed
    function renderCompanyFeed() {
        const feedContainer = document.getElementById('companyFeed');
        if (!feedContainer) return;
        
        feedContainer.innerHTML = ''; 

        companiesData.forEach(company => {
            // Create Job Tags HTML
            const jobsHtml = company.jobs.map(job => `<span class="job-tag">${job}</span>`).join('');

            const card = `
                <div class="company-card">
                    <div class="company-header">
                        <div class="company-avatar">
                            <ion-icon name="${company.icon}"></ion-icon>
                        </div>
                        <div class="company-info">
                            <h5>${company.name}</h5>
                            <span>${company.location} • ${company.industry}</span>
                        </div>
                    </div>
                    <div class="company-body">
                        <p>${company.desc}</p>
                        <div class="job-tags">
                            ${jobsHtml}
                        </div>
                    </div>
                    <div class="company-footer">
                        <div class="slots-info">
                            <ion-icon name="people-circle-outline"></ion-icon>
                            <strong>${company.slots}</strong> slots available
                        </div>
                        <!-- Updated HREF -->
                        <a href="${company.link}" target="_blank" class="btn-apply">View Details</a>
                    </div>
                </div>
            `;
            feedContainer.innerHTML += card;
        });
    }

    window.deleteIntern = function(index) {
        if(confirm("Delete this student?")) {
            internsData.splice(index, 1);
            saveData();
            updateUI();
        }
    };

    // --- 3. CHART LOGIC ---
    function updateMainChart(placedCount, pendingCount) {
        const ctx = document.getElementById('internshipChart');
        if (!ctx) return;

        if (myChart) {
            myChart.data.datasets[0].data = [placedCount, pendingCount];
            myChart.update();
        } else {
            myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Placed', 'Pending'],
                    datasets: [{
                        data: [placedCount, pendingCount],
                        backgroundColor: ['#3b82f6', '#e5e7eb'],
                        borderWidth: 0,
                        hoverOffset: 10,
                        hoverBackgroundColor: ['#2563eb', '#d1d5db']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { position: 'right' },
                        tooltip: { enabled: true }
                    },
                    onHover: (event, chartElement) => {
                        event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
                    }
                }
            });
        }
    }

    function updateBarChart() {
        const ctx = document.getElementById('companyChart');
        if (!ctx) return;

        const companyCounts = {};
        internsData.forEach(i => {
            if (i.status === 'Placed' && i.company && i.company !== '-') {
                companyCounts[i.company] = (companyCounts[i.company] || 0) + 1;
            }
        });

        const labels = Object.keys(companyCounts);
        const data = Object.values(companyCounts);

        if (barChart) {
            barChart.data.labels = labels;
            barChart.data.datasets[0].data = data;
            barChart.update();
        } else {
            barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Interns',
                        data: data,
                        backgroundColor: '#6366f1',
                        borderRadius: 4,
                        barThickness: 20
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { display: false } },
                        x: { grid: { display: false } }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }
    }

    // --- 4. EVENT LISTENERS ---
    const addForm = document.getElementById('addInternForm');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('newInternName').value;
            const company = document.getElementById('newInternCompany').value;
            const status = document.getElementById('newInternStatus').value;
            
            const lastId = internsData.length > 0 ? internsData[internsData.length - 1].id : 2025000;
            const newIntern = { id: lastId + 1, name: name, company: company, status: status };

            internsData.push(newIntern);
            saveData();
            updateUI();
            addForm.reset();
            alert("Student added! Charts updated.");
        });
    }

    const navLists = document.querySelectorAll(".navList");
    const dataTables = document.querySelectorAll(".data-table");
    navLists.forEach((element, index) => {
        element.addEventListener('click', function() {
            navLists.forEach(e => e.classList.remove('active'));
            this.classList.add('active');
            dataTables.forEach(table => table.style.display = 'none');
            if (dataTables[index]) { dataTables[index].style.display = 'block'; }
        });
    });

    loadData();
});