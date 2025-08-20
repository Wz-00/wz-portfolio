// Navigation toggler for mobile view
document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".navbar-toggler");
  const navMenu = document.getElementById("navbarNav");
  const downloadBtn = document.getElementById("downloadCvBtn");
  const container = document.getElementById("navbarContainer");

  // Simpan referensi elemen sebelum tombol (supaya tahu posisi asli)
  const originalNextSibling = downloadBtn.nextElementSibling;

  // toggle collapse
  toggler.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // auto close menu ketika klik link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 991) {
        navMenu.classList.remove("show");
      }
    });
  });

  // fungsi pindahkan tombol
  function handleResize() {
    if (window.innerWidth <= 991) {
      if (!navMenu.contains(downloadBtn)) {
        navMenu.appendChild(downloadBtn);
        downloadBtn.classList.add("mt-3");
      }
    } else {
      if (!container.contains(downloadBtn) || navMenu.contains(downloadBtn)) {
        // kembalikan tombol ke posisi semula
        if (originalNextSibling) {
          container.insertBefore(downloadBtn, originalNextSibling);
        } else {
          container.appendChild(downloadBtn); // fallback jika tidak ada sibling
        }
        downloadBtn.classList.remove("mt-3");
      }
    }
  }

  // jalankan pertama kali + setiap resize
  handleResize();
  window.addEventListener("resize", handleResize);
});



// modal image loading with delay
const imageModal = document.getElementById('imageModal');
  const loading = document.getElementById('loading');
  const imageContent = document.getElementById('imageContent');
  const modalImage = document.getElementById('modalImage');

  let targetImage = "";

  // get buttons that open the modal
  document.querySelectorAll('.open-image').forEach(btn => {
    btn.addEventListener('click', function() {
      targetImage = this.getAttribute('data-image');
    });
  });

  // when modal is shown, reset and load image
  imageModal.addEventListener('show.bs.modal', function () {
    // Reset kondisi
    loading.classList.remove('hidden');
    imageContent.classList.add('hidden');
    imageContent.classList.remove('show');
    modalImage.src = "";

    // delay loading image
    setTimeout(() => {
      modalImage.src = targetImage;
      modalImage.onload = function() {
        loading.classList.add('hidden');
        imageContent.classList.remove('hidden');
        setTimeout(() => imageContent.classList.add('show'), 50);
      };
    }, 1000);
  });
// smooth scroll for navbar links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const yOffset = -80; // offset navbar
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
});
// navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > window.innerHeight) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const myModal = document.getElementById('myModal')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})
// rearranging portfolio columns based on screen size
function rearrangeColumns() {
    const row = document.getElementById("portfolioRow");
    const textCol = document.getElementById("textCol");
    const imageCol = document.getElementById("imageCol");

    if (window.innerWidth < 768) {
      // ukuran small -> gambar di atas, teks di bawah
      if (row.firstElementChild !== imageCol) {
        row.insertBefore(imageCol, textCol);
      }
    } else {
      // ukuran md ke atas -> teks di kiri, gambar di kanan
      if (row.firstElementChild !== textCol) {
        row.insertBefore(textCol, imageCol);
      }
    }
  }


  window.addEventListener("load", rearrangeColumns);
  window.addEventListener("resize", rearrangeColumns);
  
