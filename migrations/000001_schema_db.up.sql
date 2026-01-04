CREATE TABLE roles (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES ('admin'), ('teacher'), ('student');

CREATE TABLE attendance_statuses (
                                     id SERIAL PRIMARY KEY,
                                     name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO attendance_statuses (name) VALUES ('present'), ('permission'), ('sick'), ('absent');

CREATE TABLE classes (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(10) NOT NULL UNIQUE
);

INSERT INTO classes (name) VALUES ('A'), ('B');

CREATE TABLE verification_statuses (
                                       id SERIAL PRIMARY KEY,
                                       name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO verification_statuses (name) VALUES ('pending'), ('verified'), ('rejected');

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role_id INT NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

CREATE TABLE subjects (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE teachers (
                          id SERIAL PRIMARY KEY,
                          user_id INT NOT NULL,
                          nip VARCHAR(20) UNIQUE,
                          full_name VARCHAR(100) NOT NULL,
                          specialization VARCHAR(50),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT fk_teachers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_teachers_user ON teachers(user_id);
CREATE INDEX idx_teachers_full_name ON teachers(full_name);
CREATE INDEX idx_teachers_nip ON teachers(nip);

CREATE TABLE students (
                          id SERIAL PRIMARY KEY,
                          user_id INT NOT NULL,
                          student_number VARCHAR(20) UNIQUE,
                          full_name VARCHAR(100) NOT NULL,
                          parent_name VARCHAR(100),
                          parent_phone VARCHAR(20),
                          class_id INT,
                          address TEXT,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                          CONSTRAINT fk_students_class FOREIGN KEY (class_id) REFERENCES classes(id)
);

CREATE INDEX idx_students_user ON students(user_id);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_students_full_name ON students(full_name);
CREATE INDEX idx_students_student_id ON students(student_number);

CREATE TABLE class_journals (
                                id SERIAL PRIMARY KEY,
                                date DATE NOT NULL,
                                subject_id INT NOT NULL,
                                class_id INT NOT NULL,
                                topic VARCHAR(255) NOT NULL,
                                notes TEXT,
                                teacher_id INT NOT NULL,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                CONSTRAINT fk_journals_subject FOREIGN KEY (subject_id) REFERENCES subjects(id),
                                CONSTRAINT fk_journals_class FOREIGN KEY (class_id) REFERENCES classes(id),
                                CONSTRAINT fk_journals_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id),
                                CONSTRAINT uq_journal_unique_session UNIQUE (date, subject_id, class_id, teacher_id)
);

CREATE INDEX idx_journals_subject ON class_journals(subject_id);
CREATE INDEX idx_journals_class ON class_journals(class_id);
CREATE INDEX idx_journals_teacher ON class_journals(teacher_id);
CREATE INDEX idx_journals_date ON class_journals(date);
CREATE INDEX idx_journals_class_date ON class_journals(class_id, date);

CREATE TABLE attendance (
                            id SERIAL PRIMARY KEY,
                            journal_id INT NOT NULL,
                            student_id INT NOT NULL,
                            status_id INT NOT NULL DEFAULT 1,
                            notes VARCHAR(255),
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            CONSTRAINT fk_attendance_journal FOREIGN KEY (journal_id) REFERENCES class_journals(id) ON DELETE CASCADE,
                            CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
                            CONSTRAINT fk_attendance_status FOREIGN KEY (status_id) REFERENCES attendance_statuses(id),
                            CONSTRAINT uq_attendance_unique UNIQUE (journal_id, student_id)
);

CREATE INDEX idx_attendance_journal ON attendance(journal_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_status ON attendance(status_id);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, created_at);

CREATE TABLE student_registrations (
                                       id SERIAL PRIMARY KEY,
                                       user_id INT UNIQUE,
                                       full_name VARCHAR(100) NOT NULL,
                                       address TEXT NOT NULL,
                                       parent_name VARCHAR(100) NOT NULL,
                                       parent_phone VARCHAR(20) NOT NULL,
                                       verification_status_id INT DEFAULT 1,
                                       registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                       CONSTRAINT fk_registrations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                       CONSTRAINT fk_registrations_status FOREIGN KEY (verification_status_id) REFERENCES verification_statuses(id)
);

CREATE INDEX idx_registrations_user ON student_registrations(user_id);
CREATE INDEX idx_registrations_status ON student_registrations(verification_status_id);
CREATE INDEX idx_registrations_status_date ON student_registrations(verification_status_id, registered_at);

INSERT INTO users (id, username, email, password, role_id, created_at) VALUES
                                                                           (1, 'superadmin', 'superadmin@gmail.com', '$2y$10$MMOBnJUo3CvCJ2Y34ZnyvukFG2znKSyD.eA9057.7vzKItwevbDse', 1, '2025-12-23 09:17:06'),
                                                                           (2, 'ust_zakky', 'zakky@gmail.com', '$2y$10$m5/AHWa2w0xxirSTbMyzhOhzbygF69xOObBrAChS17sOBUY2ENjta', 2, '2025-12-23 09:17:06'),
                                                                           (3, 'haikal', 'haikal@gmail.com', '$2y$10$cihbrKjdoY66BZSgkvY3QeKFMMc5KQ5xcZliw8IV/0KnqFnhppqEa', 3, '2025-12-23 09:17:06'),
                                                                           (4, 'albany', 'albany@gmail.com', '$2y$10$gb/kKaK0kiY5/N15SDT7q.2suPvQhh1goTXv/4CG55Ji4pwHf8Wl.', 3, '2025-12-23 16:13:13');

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

INSERT INTO subjects (id, name, code) VALUES
                                          (1, 'Islamic Jurisprudence (Fiqih)', 'FIQ'),
                                          (2, 'Arabic Grammar (Nahwu)', 'NHW'),
                                          (3, 'Quran Memorization (Tahfidz)', 'TFZ');

SELECT setval('subjects_id_seq', (SELECT MAX(id) FROM subjects));

INSERT INTO teachers (id, user_id, nip, full_name, specialization, created_at) VALUES
    (1, 2, '123456', 'Ustadz Zakky', 'Islamic Jurisprudence', '2025-12-23 09:17:06');

SELECT setval('teachers_id_seq', (SELECT MAX(id) FROM teachers));

INSERT INTO students (id, user_id, student_number, full_name, parent_name, parent_phone, class_id, address, created_at) VALUES
                                                                                                                        (1, 3, '998877', 'Moh. Faiz Haikal', 'Father', '0895336414713', 1, 'Surabaya', '2025-12-23 09:17:06'),
                                                                                                               (2, 4, NULL, 'Albany Raffa Assyukura', 'Father', '083111280866', 1, 'Bojonegoro', '2025-12-23 16:13:13');

SELECT setval('students_id_seq', (SELECT MAX(id) FROM students));

INSERT INTO class_journals (id, date, subject_id, class_id, topic, notes, teacher_id, created_at) VALUES
    (1, '2025-12-23', 1, 1, 'Purification (Wudhu)', '-', 1, '2025-12-23 16:41:22');

SELECT setval('class_journals_id_seq', (SELECT MAX(id) FROM class_journals));

INSERT INTO attendance (id, journal_id, student_id, status_id, notes, created_at) VALUES
                                                                                      (1, 1, 2, 1, NULL, '2025-12-23 16:41:22'),
                                                                                      (2, 1, 1, 1, NULL, '2025-12-23 16:41:22');

SELECT setval('attendance_id_seq', (SELECT MAX(id) FROM attendance));

INSERT INTO student_registrations (id, user_id, full_name, address, parent_name, parent_phone, verification_status_id, registered_at) VALUES
                                                                                                                                          (1, 3, 'Moh. Faiz Haikal', 'Surabaya', 'Father', '0895336414713', 2, '2025-12-23 15:08:57'),
                                                                                                                                          (2, 4, 'Albany Raffa Assyukura', 'Bojonegoro', 'Father', '083111280866', 2, '2025-12-23 16:03:48');

SELECT setval('student_registrations_id_seq', (SELECT MAX(id) FROM student_registrations));