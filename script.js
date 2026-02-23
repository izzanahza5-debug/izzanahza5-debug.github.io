const textElement = document.getElementById('typewriter');
const phrases = ["XI TKJ 1.", "Kelas Terbaik.", "Kelas Favorit."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  // Logika kecepatan mengetik
  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; // Jeda saat teks selesai diketik
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', type);

// Fungsi untuk menjalankan Counter
const startCounters = () => {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = 1000; // Semakin besar semakin lambat
    
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(() => startCounters(), 1);
    } else {
      counter.innerText = target;
    }
  });
};

// Intersection Observer untuk mendeteksi scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounters();
      observer.unobserve(entry.target); // Hanya jalankan sekali
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('#about').forEach(el => observer.observe(el));


// 1. Data Siswa (Bisa kamu tambah sampai 36 siswa)
const students = [
  { name: "Ahmad Fauzi", role: "Network Engineer", img: "https://i.pravatar.cc/150?u=1" },
  { name: "Budi Santoso", role: "System Admin", img: "https://i.pravatar.cc/150?u=2" },
  { name: "Citra Lestari", role: "Cyber Security", img: "https://i.pravatar.cc/150?u=3" },
  { name: "Deni Ramadhan", role: "Hardware Specialist", img: "https://i.pravatar.cc/150?u=4" },
  { name: "Eka Putri", role: "Cloud Architect", img: "https://i.pravatar.cc/150?u=5" },
  // Tambahkan data lainnya di sini...
];

const studentListContainer = document.getElementById('student-list');
const searchInput = document.getElementById('student-search');

// 2. Fungsi untuk menampilkan siswa
function displayStudents(filteredStudents) {
  studentListContainer.innerHTML = ""; // Bersihkan kontainer
  
  filteredStudents.forEach(student => {
    const card = `
      <div class="col-6 col-md-4 col-lg-3 student-item">
        <div class="student-card p-3 rounded-4 d-flex align-items-center gap-3">
          <img src="${student.img}" alt="${student.name}" class="rounded-circle student-img">
          <div>
            <h6 class="mb-1 fw-bold text-white text-truncate" style="max-width: 120px;">${student.name}</h6>
            <span class="badge badge-tkj rounded-pill">${student.role}</span>
          </div>
        </div>
      </div>
    `;
    studentListContainer.innerHTML += card;
  });
}

// 3. Logika Pencarian
searchInput.addEventListener('keyup', (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = students.filter(student => 
    student.name.toLowerCase().includes(keyword) || 
    student.role.toLowerCase().includes(keyword)
  );
  displayStudents(filtered);
});

// Jalankan saat pertama kali dimuat
displayStudents(students);