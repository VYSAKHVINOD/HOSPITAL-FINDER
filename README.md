# 🏥 Hospital Finder (Kerala)

> A full-stack web portal for discovering, searching, and managing healthcare facilities across all 14 districts of Kerala.

[![PHP Version](https://img.shields.io/badge/PHP-7.4%20%7C%208.x-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-5.7%20%7C%208.x-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Overview

**Hospital Finder** is a web-based healthcare directory designed to help citizens and visitors quickly locate verified hospitals across Kerala based on **district** and **medical specialization**. The application features dynamic real-time querying, multi-language internationalization, accessibility enhancements, emergency contacts, and an admin management dashboard.

---

## ✨ Features

### 🌐 User-Facing Portal
- **District & Specialty Search**: Filter hospitals across all 14 Kerala districts by specialization:
  - Super Speciality Hospitals
  - Eye Specialized Hospitals
  - ENT Specialized Hospitals
  - Orthopedic Specialized Hospitals
  - Skin Specialized Hospitals
  - Dental Specialized Hospitals
- **Hospital Detailed View**: Access opening/closing hours, rating stars, contact numbers, exact addresses, and Google Maps directions.
- **Multilingual Support (i18n)**: Seamless language switcher supporting **English**, **हिंदी (Hindi)**, and **മലയാളം (Malayalam)**.
- **Display & Accessibility Settings**:
  - 🌙 Dark Mode toggle
  - 🟡 Eye Protection (warm tint) mode
  - 🔈 Interactive Sound Effects
- **Emergency Helpline Directory**: One-click modal containing national emergency contacts (Police, Ambulance, Women Helpline, Childline, Cyber Crime, etc.).
- **Healthcare Facts**: Rotating evidence-based health tips and facts.
- **User Feedback System**: Interactive feedback modal with backend storage in MySQL.

### 🛡️ Admin Dashboard
- **Analytics Overview**: Real-time counter of total hospitals, districts covered, and received feedback entries.
- **Add Hospital**: Form to add new hospital records with district, timings, specialization, and map links.
- **Delete Hospital**: District-filtered listing with confirmation dialogs to delete hospital records.
- **Feedback Management**: Paginated view of user feedback submissions with XSS sanitization and deletion actions.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Custom Responsive Styling + Glassmorphism), Vanilla JavaScript (ES6+)
- **Admin UI**: Bootstrap 5, FontAwesome 6
- **Backend**: PHP (REST JSON APIs + Admin Controllers)
- **Database**: MySQL (PDO with Prepared Statements)
- **Local Server**: WAMP / XAMPP / LAMP / MAMP

---

## 📂 Project Structure

```text
HOSPITAL FINDER/
├── admin/
│   ├── add_hospital.php         # Admin form to add new hospitals
│   ├── admin_dashboard.php      # Main admin overview & statistics
│   ├── db_connection.php        # Admin database connection handler
│   ├── delete_hospital.php      # Admin view to browse & delete hospitals
│   ├── login.php                # Admin authentication login page
│   ├── logout.php               # Admin session logout handler
│   ├── update_feedback_table.sql
│   └── user_feedback.php        # Feedback moderation & pagination
├── api/
│   ├── get_hospitals.php        # API endpoint: Filter hospitals by district/type
│   ├── get_hospital_details.php # API endpoint: Fetch specific hospital by ID
│   └── submit_feedback.php      # API endpoint: Save user feedback
├── database.sql                 # Complete MySQL schema & seed data (All 14 districts)
├── db_connection.php            # Root PDO database connection configuration
├── hfimg1.jpg - hfimg4.jpg      # Hero slider imagery
├── index.html                   # Main application homepage & modals
├── login.html                   # Frontend user login UI
├── script.js                    # Core frontend logic, i18n, modals & events
├── style.css                    # Global application stylesheet
├── .gitignore                   # Git ignore patterns for OS/IDE files
└── LICENSE                      # MIT Open-Source License
```

---

## 🚀 Getting Started / Setup Guide

Follow these steps to run the project locally using **WAMP** or **XAMPP**:

### 1. Prerequisites
- [WAMP Server](https://www.wampserver.com/) or [XAMPP](https://www.apachefriends.org/) installed with **PHP 7.4+** and **MySQL 5.7+**.

### 2. Clone or Copy the Repository
Place the project folder inside your web server's root directory:
- **WAMP**: `C:\wamp64\www\HOSPITAL FINDER\`
- **XAMPP**: `C:\xampp\htdocs\HOSPITAL FINDER\`

```bash
git clone https://github.com/<your-username>/hospital-finder.git "HOSPITAL FINDER"
```

### 3. Import the Database
1. Start **WAMP** / **XAMPP** (Ensure Apache and MySQL services are running).
2. Open your browser and navigate to **phpMyAdmin**:
   ```
   http://localhost/phpmyadmin
   ```
3. Click on the **Import** tab at the top.
4. Click **Choose File** and select `database.sql` from the project folder.
5. Click **Go** (or **Import**).
   *(This will automatically create the `kerala_hospitals` database along with tables and sample seed records for all 14 districts).*

### 4. Database Configuration (Optional)
Check [db_connection.php](db_connection.php) to make sure database credentials match your local setup:
```php
$host = 'localhost';
$dbname = 'kerala_hospitals';
$username = 'root'; // default for WAMP/XAMPP
$password = '';     // default empty password
```

### 5. Launch the Application
Open your web browser and visit:
```
http://localhost/HOSPITAL%20FINDER/
```

---

## 🔑 Default Admin Credentials

To access the Admin Portal (`/admin/login.php` or via the **Admin** link in navbar):

| Username | Password | Role |
| :--- | :--- | :--- |
| `admin` | `admin123` | Administrator |
| `kerala` | `kerala123` | Hospital Moderator |

> *Note: These are mock demo credentials for local development.*

---

## 📡 API Reference

### 1. Get Hospitals
- **Endpoint**: `GET /api/get_hospitals.php`
- **Query Parameters**:
  - `district` *(required)*: e.g., `Ernakulam`
  - `specialized` *(optional)*: e.g., `Eye Specialized Hospital` or `ALL`
- **Response**:
  ```json
  [
    {
      "id": 16,
      "name": "Aster Medcity / Amrita Hospital Kochi",
      "address": "Ponekkara, Edappally, Ernakulam, Kerala 682041",
      "services": "Super Speciality Hospital",
      "rating": "4.9",
      "phone": "0484-2851234",
      "opening_time": "12:00 AM",
      "closing_time": "11:59 PM",
      "links": "https://maps.google.com/?q=Amrita+Hospital+Kochi"
    }
  ]
  ```

### 2. Get Hospital Details
- **Endpoint**: `GET /api/get_hospital_details.php`
- **Query Parameters**: `id` (e.g. `?id=1`)

### 3. Submit Feedback
- **Endpoint**: `POST /api/submit_feedback.php`
- **Body**: `name`, `email`, `feedback`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
