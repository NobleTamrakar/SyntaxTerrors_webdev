CREATE TABLE Bangalore_Places (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    category VARCHAR(50),
    location VARCHAR(255),
    hours_of_operation VARCHAR(50),
    contact_info VARCHAR(50),
    entry_fee VARCHAR(50),
    rating DECIMAL(2, 1)
);

-- Insert sample data
INSERT INTO Bangalore_Places (name, category, location, hours_of_operation, contact_info, entry_fee, rating) VALUES
('Lalbagh Botanical Garden', 'Tourist Attraction', 'Mavalli, Bangalore', '6 AM - 7 PM', '+91 80 2657 8184', 'Rs. 20', 4.5),
('Bangalore Palace', 'Historical Site', 'Vasanth Nagar, Bangalore', '10 AM - 5:30 PM', '+91 80 2336 0818', 'Rs. 230 (Indians)', 4.3),
('Mavalli Tiffin Room (MTR)', 'Restaurant', 'Basavanagudi, Bangalore', '6:30 AM - 11 AM, 12 PM - 9 PM', '+91 80 2222 0022', 'None', 4.7),
('Cubbon Park', 'Park', 'Kasturba Road, Bangalore', '6 AM - 6 PM', '+91 80 2286 4567', 'Free', 4.6),
('Tipu Sultan''s Summer Palace', 'Historical Site', 'Chamrajpet, Bangalore', '8:30 AM - 5:30 PM', '+91 80 2670 6836', 'Rs. 20', 4.2),
('Nandi Hills', 'Nature Spot', 'Chikkaballapur, near Bangalore', '6 AM - 6 PM', '+91 8156 260836', 'Rs. 5', 4.4),
('Commercial Street', 'Shopping Area', 'Shivajinagar, Bangalore', '10 AM - 8 PM', '-', 'Free', 4.3),
('UB City', 'Shopping Mall', 'Vittal Mallya Road, Bangalore', '10 AM - 11 PM', '+91 80 2222 3456', 'Free', 4.5),
('Bannerghatta National Park', 'Wildlife Park', 'Bannerghatta, Bangalore', '9 AM - 5 PM', '+91 80 2977 7483', 'Rs. 80 (Indians)', 4.4),
('Vidhana Soudha', 'Government Building', 'Dr. Ambedkar Rd, Bangalore', 'Closed to public', '-', 'Free', 4.3);