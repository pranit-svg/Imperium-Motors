document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.location.href = this.href;
            }
        });
    });

    // --- Service Page "Buy Now" Buttons ---
    const serviceBuyButtons = document.querySelectorAll('.buy-service-btn');
    if (serviceBuyButtons.length > 0) {
        serviceBuyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.dataset.itemName;
                const itemPrice = parseFloat(this.dataset.itemPrice).toFixed(2);

                window.location.href = `receipt.html?type=service&name=${encodeURIComponent(itemName)}&price=${encodeURIComponent(itemPrice)}`;
            });
        });
    }

    // Payment Calculator Functionality
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12; // Monthly interest rate
            const loanTerm = parseFloat(document.getElementById('loanTerm').value) * 12; // Total payments

            if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount < 0 || loanTerm <= 0) {
                   alert('Please enter valid positive numbers for Loan Amount and Loan Term. Interest Rate can be 0 or positive.');
                   document.getElementById('monthlyPayment').textContent = '$0.00';
                   return;
               }

            let monthlyPayment;
            if (interestRate > 0) {
                monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
            } else { // Handle 0% interest rate
                monthlyPayment = loanAmount / loanTerm;
            }
            document.getElementById('monthlyPayment').textContent = `$${monthlyPayment.toFixed(2)}`;
        });
    }

    // Dynamic content for vehicle-detail.html and Configurator Logic
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('car');
    const vehicleDetailSection = document.getElementById('vehicle-detail-content');

    // Define all car base data and configurator options
    const allCarData = {
        'luxury-sedan-x': {
            name: '2025 Luxury Sedan X-Series',
            basePrice: 78500,
            image: 'car1.jpg',
            description: 'The epitome of luxury and performance. Experience unparalleled comfort and cutting-edge technology. This sleek sedan combines sophisticated design with dynamic driving capabilities.',
            specs: [
                'Engine: 3.0L Twin-Turbo V6', 'Horsepower: 400 HP', '0-60 MPH: 4.5s', 'Transmission: 8-Speed Automatic',
                'Fuel Economy: 22 MPG City / 30 MPG Highway', 'Interior: Premium Leather',
                'Features: Advanced Driver-Assist Systems, Panoramic Sunroof, 12-Speaker Premium Audio, Ambient Lighting.'
            ],
            colors: {
                'white': { name: 'Alpine White', price: 0 },
                'black': { name: 'Carbon Black Metallic', price: 900 },
                'silver': { name: 'Glacier Silver Metallic', price: 900 },
                'blue': { name: 'Imperial Blue Brilliant Effect', price: 1200 },
                'red': { name: 'Melbourne Red Metallic', price: 1200 }
            },
            wheels: {
                'standard': { name: '19-inch V-Spoke Alloys', price: 0, image: 'standard-wheel.png' },
                'sport': { name: '20-inch M Performance Alloys', price: 1500, image: 'sport-wheel.png' },
                'premium': { name: '21-inch Forged Chrome Alloys', price: 2800, image: 'premium-wheel.png' }
            },
            interiors: {
                'standard': { name: 'Standard Leather Interior', price: 0 },
                'premium': { name: 'Premium Nappa Leather', price: 2000 },
                'alcantara': { name: 'Alcantara Sport Interior', price: 3500 }
            },
            optionalFeatures: {
                'sunroof': { name: 'Panoramic Sunroof', price: 1200 },
                'hud': { name: 'Heads-Up Display', price: 800 },
                'audio': { name: 'Harman Kardon Premium Audio System', price: 1500 }
            }
        },
        'performance-coupe-gt': {
            name: '2024 Performance Coupe GT',
            basePrice: 112000,
            image: 'car2.jpg',
            description: 'Unleash the beast within. Designed for exhilarating drives with precision handling and aggressive styling. This coupe is built for those who demand ultimate performance.',
            specs: [
                'Engine: 4.0L V8 Supercharged', 'Horsepower: 600 HP', '0-60 MPH: 3.2s', 'Transmission: 7-Speed Dual-Clutch',
                'Fuel Economy: 18 MPG City / 25 MPG Highway', 'Interior: Alcantara Trim with Carbon Fiber Accents',
                'Features: Sport Suspension, Track Mode, Carbon Ceramic Brakes, Performance Exhaust System.'
            ],
            colors: {
                'red': { name: 'Rosso Corsa', price: 0 },
                'black': { name: 'Nero Daytona', price: 1000 },
                'yellow': { name: 'Giallo Modena', price: 1500 }
            },
            wheels: {
                'standard': { name: '20-inch GT Alloys', price: 0, image: 'standard-wheel.png' },
                'sport': { name: '21-inch Forged GT Alloys', price: 2500, image: 'sport-wheel.png' }
            },
            interiors: {
                'standard': { name: 'Sport Leather Interior', price: 0 },
                'alcantara': { name: 'Race-spec Alcantara', price: 4000 }
            },
            optionalFeatures: {
                'carbon-exterior': { name: 'Carbon Fiber Exterior Package', price: 7000 },
                'race-seats': { name: 'Carbon Fiber Racing Seats', price: 5000 }
            }
        },
        'electric-suv-e-drive': {
            name: '2025 Electric SUV E-Drive',
            basePrice: 89990,
            image: 'car3.jpg',
            description: 'Step into the future with the silent and powerful 2025 Electric SUV E-Drive. Offering impressive range and a spacious, tech-filled cabin, it\'s perfect for the eco-conscious adventurer.',
            specs: [
                'Range: 350 Miles (EPA Est.)', 'Battery: 100 kWh Lithium-Ion', '0-60 MPH: 5.0s', 'Drivetrain: Dual Motor AWD',
                'Charging: Fast Charge Capable (80% in 30 mins)', 'Interior: Sustainable Materials, Digital Cockpit',
                'Features: Autopilot/ProPilot Assist, Large Touchscreen Infotainment, Over-the-Air Updates.'
            ],
            colors: {
                'white': { name: 'Polar White', price: 0 },
                'grey': { name: 'Space Grey Metallic', price: 800 },
                'blue': { name: 'Pacific Blue', price: 1000 }
            },
            wheels: {
                'standard': { name: '19-inch Aero Alloys', price: 0, image: 'standard-wheel.png' },
                'aero': { name: '20-inch Aero Efficiency Wheels', price: 1800, image: 'sport-wheel.png' }
            },
            interiors: {
                'standard': { name: 'Recycled Fabric Interior', price: 0 },
                'vegan-leather': { name: 'Vegan Leather Interior', price: 1500 }
            },
            optionalFeatures: {
                'enhanced-autopilot': { name: 'Enhanced Autopilot Package', price: 4000 },
                'tow-package': { name: 'Towing Package', price: 1000 }
            }
        },
        'family-suv-exl': {
            name: '2022 Family SUV EXL',
            basePrice: 45000,
            image: 'car4.jpg',
            description: 'A spacious and reliable SUV perfect for growing families. With comfortable seating and ample cargo space, every journey becomes a pleasure.',
            specs: [
                'Mileage: 25,000 mi', 'Engine: 3.5L V6', 'Transmission: Automatic', 'Fuel Economy: 20 MPG City / 28 MPG Highway',
                'Seating: 7 Passengers', 'Features: Rear-view Camera, Tri-Zone Climate Control, Power Liftgate, Bluetooth Connectivity.'
            ],
            colors: {
                'black': { name: 'Jet Black', price: 0 },
                'silver': { name: 'Silver Metallic', price: 500 },
                'white': { name: 'Pearl White', price: 750 }
            },
            wheels: {
                'standard': { name: '18-inch Utility Alloys', price: 0, image: 'standard-wheel.png' }
            },
            interiors: {
                'standard': { name: 'Durable Fabric Interior', price: 0 }
            },
            optionalFeatures: {
                'roof-rails': { name: 'Roof Rails', price: 300 },
                'cargo-liner': { name: 'All-Weather Cargo Liner', price: 150 }
            }
        },
        'compact-sedan-s-line': {
            name: '2021 Compact Sedan S-Line',
            basePrice: 28990,
            image: 'car5.jpg',
            description: 'Stylish, efficient, and fun to drive. This compact sedan offers excellent fuel economy and nimble handling, ideal for city driving and daily commutes.',
            specs: [
                'Mileage: 38,000 mi', 'Engine: 2.0L 4-Cylinder Turbo', 'Transmission: Automatic',
                'Fuel Economy: 28 MPG City / 36 MPG Highway', 'Interior: Sport Seats',
                'Features: Apple CarPlay/Android Auto, Keyless Entry, Blind Spot Monitoring.'
            ],
            colors: {
                'blue': { name: 'Electric Blue', price: 0 },
                'grey': { name: 'Charcoal Grey', price: 400 }
            },
            wheels: {
                'standard': { name: '17-inch Compact Alloys', price: 0, image: 'standard-wheel.png' }
            },
            interiors: {
                'standard': { name: 'Sport Fabric Interior', price: 0 }
            },
            optionalFeatures: {
                'spoiler': { name: 'Rear Spoiler', price: 200 },
                'fog-lights': { name: 'LED Fog Lights', price: 300 }
            }
        },
        'luxury-truck-xl': {
            name: '2020 Luxury Truck XL',
            basePrice: 58000,
            image: 'car6.jpg',
            description: 'Experience rugged capability combined with luxurious comfort. This full-size truck is perfect for work, play, and everything in between, with premium features throughout.',
            specs: [
                'Mileage: 42,000 mi', 'Engine: 6.7L Power Stroke Diesel V8', 'Towing Capacity: 15,000 lbs',
                'Transmission: Automatic', 'Interior: Heated and Ventilated Leather Seats',
                'Features: Off-Road Package, Integrated Trailer Brake Controller, Large Touchscreen with Navigation.'
            ],
            colors: {
                'black': { name: 'Obsidian Black', price: 0 },
                'silver': { name: 'Platinum Silver', price: 600 },
                'white': { name: 'Diamond White', price: 900 }
            },
            wheels: {
                'standard': { name: '20-inch Heavy Duty Alloys', price: 0, image: 'standard-wheel.png' },
                'off-road': { name: '22-inch Off-Road Alloys', price: 2000, image: 'sport-wheel.png' }
            },
            interiors: {
                'standard': { name: 'Durable Leather Interior', price: 0 },
                'premium': { name: 'Quilted Leather Interior', price: 2500 }
            },
            optionalFeatures: {
                'bed-liner': { name: 'Spray-in Bed Liner', price: 500 },
                'power-steps': { name: 'Power Deployable Running Boards', price: 1200 }
            }
        }
    };

    let currentCar = null;
    let selectedColor = null;
    let selectedWheels = null;
    let selectedInterior = null;
    let selectedFeatures = new Set(); // Stores IDs of selected features

    function formatCurrency(amount) {
        return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function updateCarConfiguration() {
        if (!currentCar) return;

        let totalConfiguredPrice = currentCar.basePrice;
        let summaryFeaturesText = "None selected";
        let featureNames = [];

        // Add color price
        if (selectedColor && currentCar.colors[selectedColor]) {
            totalConfiguredPrice += currentCar.colors[selectedColor].price;
            document.getElementById('selected-color-name').textContent = currentCar.colors[selectedColor].name;
            document.getElementById('summary-color').textContent = currentCar.colors[selectedColor].name;
        } else {
            document.getElementById('selected-color-name').textContent = 'Not selected'; // Default text if no selection
            document.getElementById('summary-color').textContent = 'Not selected';
        }

        // Add wheels price
        if (selectedWheels && currentCar.wheels[selectedWheels]) {
            totalConfiguredPrice += currentCar.wheels[selectedWheels].price;
            document.getElementById('selected-wheel-name').textContent = currentCar.wheels[selectedWheels].name;
            document.getElementById('summary-wheels').textContent = currentCar.wheels[selectedWheels].name;
        } else {
            document.getElementById('selected-wheel-name').textContent = 'Not selected';
            document.getElementById('summary-wheels').textContent = 'Not selected';
        }

        // Add interior package price
        if (selectedInterior && currentCar.interiors[selectedInterior]) {
            totalConfiguredPrice += currentCar.interiors[selectedInterior].price;
            document.getElementById('selected-interior-name').textContent = currentCar.interiors[selectedInterior].name;
            document.getElementById('summary-interior').textContent = currentCar.interiors[selectedInterior].name;
        } else {
            document.getElementById('selected-interior-name').textContent = 'Not selected';
            document.getElementById('summary-interior').textContent = 'Not selected';
        }

        // Add optional features price
        if (currentCar.optionalFeatures) {
            selectedFeatures.forEach(featureId => {
                if (currentCar.optionalFeatures[featureId]) {
                    totalConfiguredPrice += currentCar.optionalFeatures[featureId].price;
                    featureNames.push(currentCar.optionalFeatures[featureId].name);
                }
            });
            if (featureNames.length > 0) {
                summaryFeaturesText = featureNames.join(', ');
            }
        }
        document.getElementById('summary-features').textContent = summaryFeaturesText;


        document.getElementById('total-price').textContent = formatCurrency(totalConfiguredPrice);
        document.getElementById('summary-base-price').textContent = formatCurrency(currentCar.basePrice);

        // Update hidden fields for purchase
        document.getElementById('car-name-hidden').value = `${currentCar.name} (Custom Config)`;
        document.getElementById('car-price-hidden').value = totalConfiguredPrice.toFixed(2);

        // --- Visual updates (if images existed for combinations) ---
        // As discussed, for a truly visual configurator where the car image changes
        // based on color/wheels, you would need image files like:
        // `car1_white_standard.jpg`, `car1_black_sport.jpg`, etc.
        // For now, the main image only changes when the base car model itself changes.
        // If you add those specific image files, you would uncomment/modify this logic:
        /*
        const mainCarImage = document.getElementById('main-car-image');
        const configuredImageName = `car_${carId}_${selectedColor || 'default'}_${selectedWheels || 'default'}.jpg`; // Example naming convention
        // Check if this specific image exists before setting, otherwise fallback to base
        // (This would require an AJAX call or more sophisticated image management)
        mainCarImage.src = currentCar.image; // Keep base image for now
        */
    }


    if (vehicleDetailSection && carId) {
        currentCar = allCarData[carId];

        if (currentCar) {
            document.title = `${currentCar.name} - Imperium Motors`;
            document.getElementById('car-name').textContent = currentCar.name;
            document.getElementById('car-base-price').textContent = `Base Price: ${formatCurrency(currentCar.basePrice)}`;

            // **FIX FOR CAR PICTURE:** Ensure this element exists and path is correct.
            const mainCarImageElement = document.getElementById('main-car-image');
            if (mainCarImageElement) {
                mainCarImageElement.src = currentCar.image; // This line sets the image
                mainCarImageElement.alt = currentCar.name;
            }

            document.getElementById('car-description').textContent = currentCar.description;

            const specsList = document.getElementById('car-specs');
            specsList.innerHTML = '';
            currentCar.specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                specsList.appendChild(li);
            });

            // Populate Configurator Options and attach listeners
            const colorOptionsDiv = document.getElementById('color-options');
            if (colorOptionsDiv) {
                colorOptionsDiv.innerHTML = ''; // Clear default HTML for dynamic population
                for (const colorId in currentCar.colors) {
                    const color = currentCar.colors[colorId];
                    const swatch = document.createElement('div');
                    swatch.classList.add('color-swatch');
                    // Define specific hex colors for better visual representation
                    const hexColor = {
                        'white': '#F0F0F0', 'black': '#222222', 'silver': '#C0C0C0',
                        'blue': '#000080', 'red': '#8B0000', 'grey': '#808080',
                        'yellow': '#FFFF00'
                    }[colorId] || '#CCCCCC'; // Default to a neutral if unknown
                    swatch.style.backgroundColor = hexColor;
                    swatch.dataset.colorId = colorId;
                    swatch.title = `${color.name} (+ ${formatCurrency(color.price)})`;
                    swatch.addEventListener('click', () => {
                        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
                        swatch.classList.add('selected');
                        selectedColor = colorId;
                        updateCarConfiguration();
                    });
                    colorOptionsDiv.appendChild(swatch);
                }
                // Select first color by default
                if (Object.keys(currentCar.colors).length > 0) {
                    const firstColorId = Object.keys(currentCar.colors)[0];
                    colorOptionsDiv.querySelector(`[data-color-id="${firstColorId}"]`).classList.add('selected');
                    selectedColor = firstColorId;
                }
            }


            const wheelOptionsDiv = document.getElementById('wheel-options');
            if (wheelOptionsDiv) {
                wheelOptionsDiv.innerHTML = ''; // Clear default HTML for dynamic population
                for (const wheelId in currentCar.wheels) {
                    const wheel = currentCar.wheels[wheelId];
                    const label = document.createElement('label');
                    label.classList.add('wheel-option');
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'wheel-type';
                    input.value = wheelId;
                    if (wheelId === 'standard') { // Set standard as default selected
                        input.checked = true;
                        selectedWheels = wheelId;
                    }
                    input.addEventListener('change', () => {
                        selectedWheels = wheelId;
                        updateCarConfiguration();
                    });
                    const img = document.createElement('img');
                    img.src = wheel.image; // Use the image path defined in car data
                    img.alt = wheel.name;
                    const span = document.createElement('span');
                    span.innerHTML = `${wheel.name} <br><small>+ ${formatCurrency(wheel.price)}</small>`;
                    label.appendChild(input);
                    label.appendChild(img);
                    label.appendChild(span);
                    wheelOptionsDiv.appendChild(label);
                }
            }


            const interiorSelect = document.getElementById('interior-package-select');
            if (interiorSelect) {
                interiorSelect.innerHTML = ''; // Clear default HTML for dynamic population
                for (const interiorId in currentCar.interiors) {
                    const interior = currentCar.interiors[interiorId];
                    const option = document.createElement('option');
                    option.value = interiorId;
                    option.textContent = `${interior.name} (+ ${formatCurrency(interior.price)})`;
                    if (interiorId === 'standard') {
                        option.selected = true;
                        selectedInterior = interiorId;
                    }
                    interiorSelect.appendChild(option);
                }
                interiorSelect.addEventListener('change', (event) => {
                    selectedInterior = event.target.value;
                    updateCarConfiguration();
                });
            }


            const optionalFeaturesDiv = document.getElementById('optional-features');
            if (optionalFeaturesDiv) {
                optionalFeaturesDiv.innerHTML = ''; // Clear default HTML for dynamic population
                for (const featureId in currentCar.optionalFeatures) {
                    const feature = currentCar.optionalFeatures[featureId];
                    const label = document.createElement('label');
                    label.classList.add('feature-checkbox');
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.dataset.featureId = featureId;
                    input.addEventListener('change', (event) => {
                        if (event.target.checked) {
                            selectedFeatures.add(featureId);
                        } else {
                            selectedFeatures.delete(featureId);
                        }
                        updateCarConfiguration();
                    });
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(` ${feature.name} (+ ${formatCurrency(feature.price)})`));
                    optionalFeaturesDiv.appendChild(label);
                }
            }

            // Initial update of configuration summary and price
            updateCarConfiguration();

            // **FIX FOR BUY BUTTON:** Attach listener here, after car data is loaded and configurator is set up.
            const buyCarButton = document.getElementById('buy-car-btn');
            if (buyCarButton) {
                buyCarButton.addEventListener('click', function() {
                    const configuredCarName = document.getElementById('car-name-hidden').value;
                    const configuredCarPrice = document.getElementById('car-price-hidden').value;
                    window.location.href = `receipt.html?type=car&name=${encodeURIComponent(configuredCarName)}&price=${encodeURIComponent(configuredCarPrice)}`;
                });
            }


        } else {
            document.title = 'Vehicle Not Found - Imperium Motors';
            document.getElementById('car-name').textContent = 'Vehicle Not Found';
            document.getElementById('car-base-price').textContent = '';
            const mainCarImageElement = document.getElementById('main-car-image');
            if (mainCarImageElement) {
                 mainCarImageElement.src = 'no-image-available.png'; // Fallback for image
                 mainCarImageElement.alt = 'Vehicle Not Found';
            }
            document.getElementById('car-description').textContent = 'The requested vehicle could not be found. Please check our inventory or contact us for assistance.';
            document.getElementById('car-specs').innerHTML = '';
            const configuratorSection = document.querySelector('.car-configurator');
            if (configuratorSection) {
                configuratorSection.style.display = 'none'; // Hide configurator
            }
            const buyCarButton = document.getElementById('buy-car-btn'); // Get button to hide it
            if (buyCarButton) {
                buyCarButton.style.display = 'none'; // Hide button if car not found
            }
        }
    }

    // --- Handle Receipt Page Content ---
    const receiptContentElement = document.getElementById('receipt-content');
    if (receiptContentElement && window.location.pathname.includes('receipt.html')) {
        document.title = 'Order Receipt - Imperium Motors';

        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const price = params.get('price');
        const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase();
        const purchaseDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        let contentHtml = '';

        if (name && price) {
            contentHtml = `
                <p class="fs-5">Thank you for your purchase!</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Date:</strong> ${purchaseDate}</p>
                <hr>
                <h4 class="mb-3">Item Details:</h4>
                <p class="fs-4 fw-bold">${decodeURIComponent(name)}</p>
                <p class="fs-3 text-primary">Price: $${parseFloat(decodeURIComponent(price)).toFixed(2)}</p>
                <hr>
                <p class="text-muted">This is a simulated purchase for demonstration. No actual transaction occurred.</p>
            `;
        } else {
            contentHtml = `
                <p class="text-danger">Error: Could not retrieve receipt details. Please try again.</p>
                <p class="text-muted">It seems you landed on this page without a specific item or service being selected.</p>
            `;
        }
        receiptContentElement.innerHTML = contentHtml;
    }

    // --- Confirmation Page Content (Simplified as previous forms are gone) ---
    const confirmationMessageElement = document.getElementById('confirmation-message');
    if (confirmationMessageElement && window.location.pathname.includes('confirmation.html')) {
        document.title = 'Confirmation - Imperium Motors';

        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');

        let title = 'Request Submitted!';
        let message = 'Your request has been processed. We appreciate your interest.';
        let buttonText = 'Return to Homepage';
        let buttonLink = 'index.html';

        if (type === 'testdrive') {
            title = 'Test Drive Request Submitted!';
            message = 'Thank you for requesting a test drive. Our team will contact you shortly to confirm the details.';
            buttonText = 'Explore More Vehicles';
            buttonLink = 'new-vehicles.html';
        } else if (type === 'finance') {
            title = 'Finance Application Submitted!';
            message = 'Thank you for your finance application. Our finance team will review your information and be in touch soon.';
            buttonText = 'Return to Financing';
            buttonLink = 'financing.html';
        } else if (type === 'service') {
            title = 'Service Appointment Request Submitted!';
            message = 'Thank you for requesting a service appointment. Our service team will contact you to confirm the details.';
            buttonText = 'Return to Services';
            buttonLink = 'service.html';
        }


        confirmationMessageElement.innerHTML = `
            <h2>${title}</h2>
            <p>${message}</p>
            <a href="${buttonLink}" class="btn btn-primary">${buttonText}</a>
        `;
    }
});