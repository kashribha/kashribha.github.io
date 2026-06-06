
document.addEventListener('DOMContentLoaded', function() {
    // 1. Intersection Observer for scroll animations
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(function(element) {
        observer.observe(element);
    });

    // 2. Highlight active nav
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(function(link) {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Grid Trail Logic
    var gridContainer = document.getElementById('grid-trail');
    var cols = 0, rows = 0;
    
    if (gridContainer) {
        var createGrid = function() {
            gridContainer.innerHTML = '';
            var size = 50; 
            cols = Math.ceil(window.innerWidth / size);
            rows = Math.ceil(window.innerHeight / size);
            gridContainer.style.setProperty('--columns', cols);
            gridContainer.style.setProperty('--rows', rows);
            
            var fragment = document.createDocumentFragment();
            for(var i=0; i<cols*rows; i++) {
                var cell = document.createElement('div');
                cell.className = 'grid-cell';
                fragment.appendChild(cell);
            }
            gridContainer.appendChild(fragment);
        };
        
        createGrid();
        window.addEventListener('resize', createGrid);
        
        document.addEventListener('mousemove', function(e) {
            if (!gridContainer) return;
            var size = 50;
            var col = Math.floor(e.clientX / size);
            var row = Math.floor(e.clientY / size);
            var index = row * cols + col;
            
            var cells = gridContainer.children;
            if (cells[index]) {
                var cell = cells[index];
                cell.classList.add('active');
                setTimeout(function() {
                    cell.classList.remove('active');
                }, 800); 
            }
        });
    }

    // 4. Floating Parallax
    var shapes = document.querySelectorAll('.floating-shape');
    if (shapes.length > 0) {
        document.addEventListener('mousemove', function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 40;
            var y = (e.clientY / window.innerHeight - 0.5) * 40;
            shapes.forEach(function(shape, index) {
                var speed = (index + 1) * 0.8;
                shape.style.transform = "translate(" + (x * speed) + "px, " + (y * speed) + "px) rotate(" + (x*1.5) + "deg)";
            });
        });
    }

    
    // Modal logic is handled inline in projects.html
});
