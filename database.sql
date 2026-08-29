-- ==========================================================
-- Hospital Finder - Kerala Hospitals Database Schema & Seed Data
-- ==========================================================

-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS `kerala_hospitals` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `kerala_hospitals`;

-- --------------------------------------------------------
-- Table structure for table `hospitals`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `hospitals`;
CREATE TABLE `hospitals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `district` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `address` TEXT NOT NULL,
  `specialization` VARCHAR(255) NOT NULL,
  `rating` DECIMAL(2, 1) NOT NULL DEFAULT 4.0,
  `phone` VARCHAR(30) NOT NULL,
  `opening_time` TIME NOT NULL DEFAULT '00:00:00',
  `closing_time` TIME NOT NULL DEFAULT '23:59:59',
  `links` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `user_feedback`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `user_feedback`;
CREATE TABLE `user_feedback` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL DEFAULT '',
  `email` VARCHAR(100) NOT NULL DEFAULT '',
  `feedback_text` TEXT NOT NULL,
  `user_ip` VARCHAR(45) DEFAULT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Sample Seed Data for `hospitals` across Kerala Districts
-- --------------------------------------------------------

INSERT INTO `hospitals` (`district`, `name`, `address`, `specialization`, `rating`, `phone`, `opening_time`, `closing_time`, `links`) VALUES
-- Thiruvananthapuram
('Thiruvananthapuram', 'Government Medical College Hospital', 'Medical College PO, Thiruvananthapuram, Kerala 695011', 'Super Speciality Hospital', 4.5, '0471-2528300', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Medical+College+Hospital+Thiruvananthapuram'),
('Thiruvananthapuram', 'Regional Eye Hospital (Chaithanya)', 'Kesavadasapuram, Thiruvananthapuram, Kerala 695004', 'Eye Specialized Hospital', 4.7, '0471-2447183', '08:00:00', '20:00:00', 'https://maps.google.com/?q=Chaithanya+Eye+Hospital+Thiruvananthapuram'),
('Thiruvananthapuram', 'Kerala ENT & Hearing Care Centre', 'Pattom, Thiruvananthapuram, Kerala 695004', 'ENT Specialized Hospital', 4.3, '0471-2554433', '09:00:00', '18:00:00', 'https://maps.google.com/?q=ENT+Care+Thiruvananthapuram'),
('Thiruvananthapuram', 'City Orthopedic & Spine Clinic', 'Vellayambalam, Thiruvananthapuram, Kerala 695010', 'Orthopedic Specialized Hospital', 4.4, '0471-2723322', '09:00:00', '19:00:00', 'https://maps.google.com/?q=Orthopedic+Clinic+Thiruvananthapuram'),
('Thiruvananthapuram', 'DermaCare Skin & Laser Institute', 'Statue, Thiruvananthapuram, Kerala 695001', 'Skin Specialized Hospital', 4.6, '0471-2478899', '10:00:00', '18:00:00', 'https://maps.google.com/?q=DermaCare+Thiruvananthapuram'),
('Thiruvananthapuram', 'SmileCraft Dental Care & Implant Center', 'Kowdiar, Thiruvananthapuram, Kerala 695003', 'Dental Specialized Hospital', 4.8, '0471-2311223', '09:00:00', '20:00:00', 'https://maps.google.com/?q=Dental+Care+Kowdiar+Thiruvananthapuram'),

-- Kollam
('Kollam', 'District Hospital Kollam', 'Asramam Road, Kollam, Kerala 691001', 'Super Speciality Hospital', 4.2, '0474-2742211', '00:00:00', '23:59:59', 'https://maps.google.com/?q=District+Hospital+Kollam'),
('Kollam', 'Giridhar Eye Institute Kollam', 'Kadappakada, Kollam, Kerala 691008', 'Eye Specialized Hospital', 4.6, '0474-2765500', '08:30:00', '19:30:00', 'https://maps.google.com/?q=Giridhar+Eye+Kollam'),
('Kollam', 'Apex ENT & Speech Care', 'Chinnakada, Kollam, Kerala 691001', 'ENT Specialized Hospital', 4.3, '0474-2741122', '09:00:00', '18:30:00', 'https://maps.google.com/?q=ENT+Care+Kollam'),
('Kollam', 'Kollam Ortho & Trauma Clinic', 'Polayathode, Kollam, Kerala 691021', 'Orthopedic Specialized Hospital', 4.5, '0474-2749988', '09:00:00', '20:00:00', 'https://maps.google.com/?q=Ortho+Care+Kollam'),
('Kollam', 'Crystal Dental & Maxillofacial Care', 'Asramam, Kollam, Kerala 691002', 'Dental Specialized Hospital', 4.7, '0474-2761144', '09:30:00', '19:00:00', 'https://maps.google.com/?q=Dental+Care+Kollam'),

-- Pathanamthitta
('Pathanamthitta', 'General Hospital Pathanamthitta', 'Ring Road, Pathanamthitta, Kerala 689645', 'Super Speciality Hospital', 4.1, '0468-2222272', '00:00:00', '23:59:59', 'https://maps.google.com/?q=General+Hospital+Pathanamthitta'),
('Pathanamthitta', 'Holy Mount Eye Hospital', 'Adoor, Pathanamthitta, Kerala 691523', 'Eye Specialized Hospital', 4.5, '04734-224455', '08:30:00', '18:30:00', 'https://maps.google.com/?q=Eye+Hospital+Adoor'),
('Pathanamthitta', 'St. Thomas Orthopedic Center', 'Thiruvalla, Pathanamthitta, Kerala 689101', 'Orthopedic Specialized Hospital', 4.4, '0469-2602233', '09:00:00', '19:00:00', 'https://maps.google.com/?q=Orthopedic+Thiruvalla'),

-- Alappuzha
('Alappuzha', 'Government T.D. Medical College Hospital', 'Vandanam, Alappuzha, Kerala 688005', 'Super Speciality Hospital', 4.4, '0477-2282015', '00:00:00', '23:59:59', 'https://maps.google.com/?q=TD+Medical+College+Alappuzha'),
('Alappuzha', 'Vasan Eye Care Hospital', 'Boat Jetty Road, Alappuzha, Kerala 688011', 'Eye Specialized Hospital', 4.3, '0477-2230400', '09:00:00', '19:00:00', 'https://maps.google.com/?q=Eye+Care+Alappuzha'),
('Alappuzha', 'Alleppey Skin & Cosmetology Clinic', 'Mullenkuzhy, Alappuzha, Kerala 688012', 'Skin Specialized Hospital', 4.5, '0477-2253322', '09:30:00', '18:00:00', 'https://maps.google.com/?q=Skin+Clinic+Alappuzha'),

-- Kottayam
('Kottayam', 'Government Medical College Kottayam', 'Gandhinagar, Kottayam, Kerala 686008', 'Super Speciality Hospital', 4.6, '0481-2597279', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Medical+College+Kottayam'),
('Kottayam', 'Giridhar Eye Hospital Kottayam', 'Kanjikuzhy, Kottayam, Kerala 686004', 'Eye Specialized Hospital', 4.7, '0481-2578899', '08:30:00', '19:30:00', 'https://maps.google.com/?q=Eye+Hospital+Kottayam'),
('Kottayam', 'Central Dental & Orthodontic Clinic', 'Baker Junction, Kottayam, Kerala 686001', 'Dental Specialized Hospital', 4.8, '0481-2564411', '09:00:00', '20:00:00', 'https://maps.google.com/?q=Dental+Clinic+Kottayam'),

-- Idukki
('Idukki', 'District Hospital Thodupuzha', 'Mangattukavala, Thodupuzha, Idukki, Kerala 685584', 'Super Speciality Hospital', 4.2, '04862-222445', '00:00:00', '23:59:59', 'https://maps.google.com/?q=District+Hospital+Thodupuzha'),
('Idukki', 'High Range Eye Foundation', 'Kattappana, Idukki, Kerala 685508', 'Eye Specialized Hospital', 4.4, '04868-272211', '09:00:00', '18:00:00', 'https://maps.google.com/?q=High+Range+Eye+Kattappana'),
('Idukki', 'Highland Orthopedic & Joint Care', 'Thodupuzha, Idukki, Kerala 685585', 'Orthopedic Specialized Hospital', 4.3, '04862-228833', '09:00:00', '19:00:00', 'https://maps.google.com/?q=Ortho+Care+Thodupuzha'),

-- Ernakulam
('Ernakulam', 'Aster Medcity / Amrita Hospital Kochi', 'Ponekkara, Edappally, Ernakulam, Kerala 682041', 'Super Speciality Hospital', 4.9, '0484-2851234', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Amrita+Hospital+Kochi'),
('Ernakulam', 'Giridhar Eye Institute Kochi', 'Ponnurunni, Vyttila, Ernakulam, Kerala 682019', 'Eye Specialized Hospital', 4.8, '0484-4009999', '08:00:00', '20:00:00', 'https://maps.google.com/?q=Giridhar+Eye+Kochi'),
('Ernakulam', 'Cochin ENT & Hearing Clinic', 'Kaloor, Ernakulam, Kerala 682017', 'ENT Specialized Hospital', 4.6, '0484-2401122', '09:00:00', '19:00:00', 'https://maps.google.com/?q=ENT+Care+Kaloor+Kochi'),
('Ernakulam', 'Lakeshore Orthopedic & Spine Center', 'Nettoor, Maradu, Ernakulam, Kerala 682040', 'Orthopedic Specialized Hospital', 4.7, '0484-2701033', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Orthopedic+Center+Kochi'),
('Ernakulam', 'Cutis Skin & Laser Clinic', 'Panampilly Nagar, Ernakulam, Kerala 682036', 'Skin Specialized Hospital', 4.6, '0484-2319988', '10:00:00', '18:30:00', 'https://maps.google.com/?q=Skin+Clinic+Panampilly+Nagar'),
('Ernakulam', 'Apex Multi-Speciality Dental Care', 'MG Road, Ernakulam, Kerala 682016', 'Dental Specialized Hospital', 4.8, '0484-2374455', '09:00:00', '20:00:00', 'https://maps.google.com/?q=Dental+Care+MG+Road+Kochi'),

-- Thrissur
('Thrissur', 'Government Medical College Thrissur', 'Medical College PO, Mulamkunnathukavu, Thrissur, Kerala 680596', 'Super Speciality Hospital', 4.5, '0487-2200310', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Medical+College+Thrissur'),
('Thrissur', 'Aravind Eye Hospital Thrissur', 'Swaraj Round West, Thrissur, Kerala 680001', 'Eye Specialized Hospital', 4.7, '0487-2423344', '08:30:00', '19:30:00', 'https://maps.google.com/?q=Eye+Hospital+Thrissur'),
('Thrissur', 'Elite Ortho & Trauma Care', 'Koorkenchery, Thrissur, Kerala 680007', 'Orthopedic Specialized Hospital', 4.5, '0487-2436600', '09:00:00', '20:00:00', 'https://maps.google.com/?q=Ortho+Care+Thrissur'),
('Thrissur', 'Thrissur Dental Specialty Center', 'Round South, Thrissur, Kerala 680001', 'Dental Specialized Hospital', 4.6, '0487-2421199', '09:00:00', '19:30:00', 'https://maps.google.com/?q=Dental+Thrissur'),

-- Palakkad
('Palakkad', 'District Hospital Palakkad', 'Sultanpet, Palakkad, Kerala 678001', 'Super Speciality Hospital', 4.2, '0491-2533323', '00:00:00', '23:59:59', 'https://maps.google.com/?q=District+Hospital+Palakkad'),
('Palakkad', 'Ahalia Foundation Eye Hospital', 'Kanjikode, Palakkad, Kerala 678557', 'Eye Specialized Hospital', 4.8, '0491-2859000', '08:30:00', '19:00:00', 'https://maps.google.com/?q=Ahalia+Eye+Palakkad'),
('Palakkad', 'Palakkad ENT & Allergy Care', 'TB Road, Palakkad, Kerala 678014', 'ENT Specialized Hospital', 4.4, '0491-2504455', '09:00:00', '18:00:00', 'https://maps.google.com/?q=ENT+Care+Palakkad'),

-- Malappuram
('Malappuram', 'Government Medical College Hospital Manjeri', 'Manjeri, Malappuram, Kerala 676121', 'Super Speciality Hospital', 4.3, '0483-2766056', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Medical+College+Manjeri'),
('Malappuram', 'Al Salama Eye Hospital', 'Perinthalmanna, Malappuram, Kerala 679322', 'Eye Specialized Hospital', 4.7, '04933-227000', '08:30:00', '19:30:00', 'https://maps.google.com/?q=Eye+Hospital+Perinthalmanna'),
('Malappuram', 'Malabar Ortho & Joint Center', 'Kottakkal, Malappuram, Kerala 676503', 'Orthopedic Specialized Hospital', 4.5, '0483-2742299', '09:00:00', '19:00:00', 'https://maps.google.com/?q=Ortho+Center+Kottakkal'),

-- Kozhikode
('Kozhikode', 'Government Medical College Hospital Kozhikode', 'Medical College Junction, Kozhikode, Kerala 673008', 'Super Speciality Hospital', 4.7, '0495-2350216', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Medical+College+Kozhikode'),
('Kozhikode', 'Comtrust Charitable Eye Hospital', 'Puthiyara, Kozhikode, Kerala 673004', 'Eye Specialized Hospital', 4.8, '0495-2720232', '08:00:00', '19:00:00', 'https://maps.google.com/?q=Comtrust+Eye+Kozhikode'),
('Kozhikode', 'Calicut ENT & Hearing Care', 'Mavoor Road, Kozhikode, Kerala 673004', 'ENT Specialized Hospital', 4.5, '0495-2723388', '09:00:00', '19:00:00', 'https://maps.google.com/?q=ENT+Care+Kozhikode'),
('Kozhikode', 'Elite Skin & Cosmetology Center', 'Near Focus Mall, Kozhikode, Kerala 673004', 'Skin Specialized Hospital', 4.6, '0495-2724499', '10:00:00', '18:30:00', 'https://maps.google.com/?q=Skin+Center+Kozhikode'),
('Kozhikode', 'Dental Studio & Implant Center', 'Vandipetta, Kozhikode, Kerala 673006', 'Dental Specialized Hospital', 4.7, '0495-2761100', '09:00:00', '20:00:00', 'https://maps.google.com/?q=Dental+Studio+Kozhikode'),

-- Wayanad
('Wayanad', 'Government Medical College Hospital Wayanad', 'Mananthavady, Wayanad, Kerala 670645', 'Super Speciality Hospital', 4.1, '04935-240223', '00:00:00', '23:59:59', 'https://maps.google.com/?q=District+Hospital+Mananthavady'),
('Wayanad', 'Wayanad Eye Hospital', 'Kalpetta, Wayanad, Kerala 673121', 'Eye Specialized Hospital', 4.4, '04936-202233', '09:00:00', '18:30:00', 'https://maps.google.com/?q=Eye+Hospital+Kalpetta'),
('Wayanad', 'Valley Ortho & Trauma Clinic', 'Sulthan Bathery, Wayanad, Kerala 673592', 'Orthopedic Specialized Hospital', 4.3, '04936-224411', '09:00:00', '18:00:00', 'https://maps.google.com/?q=Ortho+Clinic+Sulthan+Bathery'),

-- Kannur
('Kannur', 'Government Medical College Kannur', 'Pariyaram, Kannur, Kerala 670503', 'Super Speciality Hospital', 4.5, '0497-2808080', '00:00:00', '23:59:59', 'https://maps.google.com/?q=Medical+College+Pariyaram+Kannur'),
('Kannur', 'Drishti Eye Hospital', 'Thana, Kannur, Kerala 670012', 'Eye Specialized Hospital', 4.6, '0497-2704400', '08:30:00', '19:00:00', 'https://maps.google.com/?q=Eye+Hospital+Thana+Kannur'),
('Kannur', 'Kannur ENT & Speech Clinic', 'Caltex, Kannur, Kerala 670002', 'ENT Specialized Hospital', 4.4, '0497-2712233', '09:00:00', '18:30:00', 'https://maps.google.com/?q=ENT+Care+Kannur'),
('Kannur', 'Perfect Smile Dental Specialty Clinic', 'Fort Road, Kannur, Kerala 670001', 'Dental Specialized Hospital', 4.7, '0497-2763322', '09:00:00', '20:00:00', 'https://maps.google.com/?q=Dental+Clinic+Fort+Road+Kannur'),

-- Kasaragod
('Kasaragod', 'General Hospital Kasaragod', 'Vidyanagar, Kasaragod, Kerala 671123', 'Super Speciality Hospital', 4.1, '04994-220023', '00:00:00', '23:59:59', 'https://maps.google.com/?q=General+Hospital+Kasaragod'),
('Kasaragod', 'Malabar Eye Care Center', 'Kanhangad, Kasaragod, Kerala 671315', 'Eye Specialized Hospital', 4.5, '0467-2204488', '09:00:00', '18:30:00', 'https://maps.google.com/?q=Eye+Care+Kanhangad'),
('Kasaragod', 'Kasaragod Dental Care', 'Bank Road, Kasaragod, Kerala 671121', 'Dental Specialized Hospital', 4.6, '04994-230112', '09:00:00', '19:00:00', 'https://maps.google.com/?q=Dental+Care+Kasaragod');

-- --------------------------------------------------------
-- Sample Seed Data for `user_feedback`
-- --------------------------------------------------------

INSERT INTO `user_feedback` (`name`, `email`, `feedback_text`, `user_ip`, `user_agent`) VALUES
('Arun Kumar', 'arun.k@example.com', 'Very helpful portal! Found emergency contact numbers and the nearest eye hospital in Kochi instantly.', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
('Sneha Nair', 'sneha.nair@example.com', 'The multilingual support (Malayalam) is very thoughtful for elderly family members. Great job!', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
('Rahul Joseph', 'rahul.j@example.com', 'Clean UI and fast search. Would love to see an ambulance booking feature in future updates.', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
