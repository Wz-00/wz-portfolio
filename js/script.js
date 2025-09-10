function compressImage() {
  const img = document.getElementById("original");
  
  // Buat elemen canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  // Atur ukuran canvas sesuai gambar asli
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  
  // Gambar ulang ke canvas
  ctx.drawImage(img, 0, 0);

  // Export ulang dengan kualitas 0.5 (50%)
  const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.5);
  
  // Tampilkan hasil
  document.getElementById("compressed").src = compressedDataUrl;

  // Jika mau simpan, bisa dibuat link download
  // const a = document.createElement("a");
  // a.href = compressedDataUrl;
  // a.download = "compressed.jpg";
  // a.click();
}


// rearranging portfolio columns based on screen size
function rearrangeColumns() {
  const rows = document.querySelectorAll("#portfolioRow"); 

  rows.forEach(row => {
    const textCols = row.querySelectorAll(".textCol");
    const imageCols = row.querySelectorAll(".imageCol");

    // pastikan jumlah text = jumlah image
    for (let i = 0; i < textCols.length; i++) {
      const textCol = textCols[i];
      const imageCol = imageCols[i];

      if (window.innerWidth < 768) {
        // ukuran small -> gambar di atas, teks di bawah
        if (imageCol.nextElementSibling !== textCol) {
          row.insertBefore(imageCol, textCol);
        }
      } else {
        // ukuran md ke atas -> teks di kiri, gambar di kanan
        if (textCol.nextElementSibling !== imageCol) {
          row.insertBefore(textCol, imageCol);
        }
      }
    }
  });
}

window.addEventListener("load", rearrangeColumns);
window.addEventListener("resize", rearrangeColumns);


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
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
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


