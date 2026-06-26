
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL UNIQUE,
    pan VARCHAR(10) NOT NULL,
    cibil_score INT DEFAULT NULL,
    score_fetched_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credit_gaps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    factor VARCHAR(100) NOT NULL,
    current_value VARCHAR(100) NOT NULL,
    ideal_value VARCHAR(100) NOT NULL,
    impact ENUM('high', 'medium', 'low') NOT NULL,
    estimated_score_gain INT NOT NULL,
    action_description TEXT NOT NULL,
    status ENUM('open', 'resolved') DEFAULT 'open',
    resolved_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    lender VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    tenure_months INT NOT NULL,
    min_score_required INT NOT NULL DEFAULT 650,
    status ENUM('pending','active','disbursed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);