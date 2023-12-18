-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2023 at 06:24 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `basketpos_final`
--

-- --------------------------------------------------------

--
-- Table structure for table `clothetype`
--

CREATE TABLE `clothetype` (
  `clotheType_ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clothetype`
--

INSERT INTO `clothetype` (`clotheType_ID`, `name`) VALUES
(1, 'Whites'),
(2, 'Colored'),
(3, 'Delicates'),
(4, 'Denim'),
(5, 'Athletic'),
(6, 'Outwear'),
(7, 'Linens'),
(8, 'Towels'),
(9, 'Curtains'),
(10, 'Rags'),
(11, 'Suits');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_ID` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `customer_eMail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_ID`, `customer_name`, `customer_phone`, `customer_eMail`) VALUES
(1, 'John Doe', '09123', 'John@gmail.com'),
(2, 'Alice Johnson', '09456', 'Alice@gmail.com'),
(3, 'Charlie Brown', '09567', 'Charlie@gmail.com'),
(4, 'Eva Martinez', '09678', 'Eva@gmail.com'),
(5, 'David Lee', '09789', 'David@gmail.com'),
(6, 'Sophie Turner', '09890', 'Sophie@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_ID` int(11) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `employee_phone` varchar(50) NOT NULL,
  `employee_eMail` varchar(50) NOT NULL,
  `employee_role` enum('storeOwner','storeEmployee','admin','') NOT NULL,
  `employee_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_ID`, `employee_name`, `employee_phone`, `employee_eMail`, `employee_role`, `employee_password`) VALUES
(1, 'person1', '091', 'owner@owner', 'storeOwner', '$2b$10$PTv2MhuFF5Oot0XozNDcFeIOxCtbQHqSuTcYq1f2S0BeNrcTVveNC');

-- --------------------------------------------------------

--
-- Table structure for table `laundrybasket`
--

CREATE TABLE `laundrybasket` (
  `order_ID` int(11) DEFAULT NULL,
  `clotheType_ID` int(11) NOT NULL,
  `serviceType_ID` int(11) NOT NULL,
  `subTotal` decimal(10,2) NOT NULL,
  `subQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundrybasket`
--

INSERT INTO `laundrybasket` (`order_ID`, `clotheType_ID`, `serviceType_ID`, `subTotal`, `subQuantity`) VALUES
(5, 7, 3, 180.00, 3),
(5, 3, 4, 195.00, 3),
(6, 1, 7, 200.00, 4),
(7, 10, 6, 240.00, 3),
(7, 11, 3, 240.00, 2),
(8, 9, 7, 150.00, 5),
(8, 8, 6, 360.00, 3),
(8, 7, 5, 80.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_ID` int(11) NOT NULL,
  `customer_ID` int(11) NOT NULL,
  `employee_ID` int(11) NOT NULL,
  `order_status` enum('Pending','Processing','Completed','ForPickup','Cancelled','Refunded') DEFAULT 'Pending',
  `order_date` date DEFAULT NULL,
  `orderpickup_date` date NOT NULL,
  `order_total` decimal(10,2) NOT NULL,
  `payment_status` enum('Paid','Not Paid') DEFAULT NULL,
  `Remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_ID`, `customer_ID`, `employee_ID`, `order_status`, `order_date`, `orderpickup_date`, `order_total`, `payment_status`, `Remarks`) VALUES
(5, 2, 1, 'Pending', '2023-12-18', '2023-12-19', 420.00, '', 'No remarks'),
(6, 1, 1, 'Pending', '2023-12-19', '2023-12-22', 224.00, '', 'No remarks'),
(7, 3, 1, 'Pending', '2023-12-19', '2023-12-22', 537.60, '', 'No remarks'),
(8, 3, 1, 'Pending', '2023-12-19', '2023-12-22', 660.80, '', 'No remarks');

-- --------------------------------------------------------

--
-- Table structure for table `pricelist`
--

CREATE TABLE `pricelist` (
  `clothetype_ID` int(11) DEFAULT NULL,
  `serviceType_ID` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `Table_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pricelist`
--

INSERT INTO `pricelist` (`clothetype_ID`, `serviceType_ID`, `price`, `Table_ID`) VALUES
(1, 3, 60.00, 1),
(1, 4, 70.00, 2),
(1, 5, 80.00, 3),
(1, 6, 100.00, 4),
(2, 3, 70.00, 5),
(2, 4, 80.00, 6),
(2, 5, 90.00, 7),
(2, 6, 120.00, 8),
(3, 3, 55.00, 9),
(3, 4, 65.00, 10),
(3, 5, 75.00, 11),
(3, 6, 80.00, 12),
(4, 3, 60.00, 13),
(4, 4, 70.00, 14),
(4, 5, 80.00, 15),
(4, 6, 150.00, 16),
(5, 3, 60.00, 17),
(5, 4, 70.00, 18),
(5, 5, 80.00, 19),
(5, 6, 100.00, 20),
(6, 3, 60.00, 21),
(6, 4, 70.00, 22),
(6, 5, 80.00, 23),
(6, 6, 100.00, 24),
(7, 3, 60.00, 25),
(7, 4, 70.00, 26),
(7, 5, 80.00, 27),
(8, 3, 70.00, 28),
(8, 4, 80.00, 29),
(8, 5, 90.00, 30),
(8, 6, 120.00, 31),
(9, 3, 40.00, 32),
(9, 4, 40.00, 33),
(9, 5, 50.00, 34),
(9, 6, 40.00, 35),
(10, 3, 55.00, 36),
(10, 4, 65.00, 37),
(10, 5, 75.00, 38),
(10, 6, 80.00, 39),
(11, 3, 120.00, 40),
(11, 4, 130.00, 41),
(11, 5, 150.00, 42),
(11, 6, 150.00, 43),
(1, 7, 50.00, 44),
(2, 7, 60.00, 45),
(3, 7, 45.00, 46),
(4, 7, 50.00, 47),
(5, 7, 50.00, 48),
(6, 7, 50.00, 49),
(7, 7, 50.00, 50),
(8, 7, 60.00, 51),
(9, 7, 30.00, 52),
(10, 7, 45.00, 53),
(11, 7, 100.00, 54);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `serviceType_ID` int(11) NOT NULL,
  `service_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`serviceType_ID`, `service_name`) VALUES
(3, 'withSoftener'),
(4, 'withIroning'),
(5, 'withSoftenerandIroning'),
(6, 'dryClean'),
(7, 'machineWash');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clothetype`
--
ALTER TABLE `clothetype`
  ADD PRIMARY KEY (`clotheType_ID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_ID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_ID`);

--
-- Indexes for table `laundrybasket`
--
ALTER TABLE `laundrybasket`
  ADD KEY `order_ID` (`order_ID`),
  ADD KEY `clotheType_ID` (`clotheType_ID`),
  ADD KEY `serviceType_ID` (`serviceType_ID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_ID`),
  ADD KEY `customer_ID` (`customer_ID`),
  ADD KEY `employee_ID` (`employee_ID`);

--
-- Indexes for table `pricelist`
--
ALTER TABLE `pricelist`
  ADD PRIMARY KEY (`Table_ID`),
  ADD KEY `clothetype_ID` (`clothetype_ID`),
  ADD KEY `serviceType_ID` (`serviceType_ID`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`serviceType_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clothetype`
--
ALTER TABLE `clothetype`
  MODIFY `clotheType_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pricelist`
--
ALTER TABLE `pricelist`
  MODIFY `Table_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `serviceType_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laundrybasket`
--
ALTER TABLE `laundrybasket`
  ADD CONSTRAINT `laundrybasket_ibfk_1` FOREIGN KEY (`order_ID`) REFERENCES `orders` (`order_ID`),
  ADD CONSTRAINT `laundrybasket_ibfk_2` FOREIGN KEY (`clotheType_ID`) REFERENCES `clothetype` (`clotheType_ID`),
  ADD CONSTRAINT `laundrybasket_ibfk_3` FOREIGN KEY (`serviceType_ID`) REFERENCES `services` (`serviceType_ID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_ID`) REFERENCES `customers` (`customer_ID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employee_ID`) REFERENCES `employees` (`employee_ID`);

--
-- Constraints for table `pricelist`
--
ALTER TABLE `pricelist`
  ADD CONSTRAINT `pricelist_ibfk_1` FOREIGN KEY (`clothetype_ID`) REFERENCES `clothetype` (`clotheType_ID`),
  ADD CONSTRAINT `pricelist_ibfk_2` FOREIGN KEY (`serviceType_ID`) REFERENCES `services` (`serviceType_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
