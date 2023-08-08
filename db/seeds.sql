INSERT INTO departments (department)
VALUES  ("Clinic"),
        ("Front Desk");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Orthodontist", 300000, 1),
        ("Orthodontic Assistant", 49000, 1),
        ("Scheduling Coordinator", 39000, 2),
        ("Team Coordinator", 50000, 2),
        ("Financial Coordinator", 44000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Pru", "Tyrell", 1, 1),
        ("Marlyn", "Street", 2, 1),
        ("Acacia", "Byrd", 2, 1),
        ("Jeffery", "Long", 2, 1),
        ("Laci", "Steffen", 3, 1),
        ("Carry", "Christians", 4, 1),
        ("Carmen", "Hale", 5, 1);