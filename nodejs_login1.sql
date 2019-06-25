-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2019 at 06:36 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_login1`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `sno` int(11) NOT NULL,
  `PID` varchar(255) NOT NULL,
  `Project_Title` text NOT NULL,
  `Project_desc` varchar(255) NOT NULL,
  `Created` date NOT NULL,
  `Teamsize` int(11) NOT NULL,
  `email` text NOT NULL,
  `shared` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`sno`, `PID`, `Project_Title`, `Project_desc`, `Created`, `Teamsize`, `email`, `shared`) VALUES
(39, '12345', 'Rami Reddy', 'welcome', '2019-05-07', 2, 'ramireddyseelam1@gmail.com', 'kartheek@nmsu.edu'),
(40, '124', 'Vinay', 'hi', '2019-05-07', 1, 'ramireddyseelam1@gmail.com', 'kartheek@nmsu.edu'),
(41, 'qq', 'qq', 'wq', '2019-05-07', 1, 'kartheek@nmsu.edu', 'sw');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` text,
  `last_name` text,
  `email` varchar(255) NOT NULL,
  `password` text,
  `created` date DEFAULT NULL
   
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`) VALUES
(18, 'Rami Reddy', 'Seelam', 'ramireddyseelam1@gmail.com', '$2b$$RtEdZfaLZATsfradadfkAsASHGJHHGHGG2RfdR/f.H.ddffdf/kHelU/R1cO', '2019-05-07'),
(19, 'Kartheek', 'Mannepalli', 'kartheek@nmsu.edu', '$2b$10$fdffffadasdjhgjsJKad.DSFDFDdffds', '2019-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `userstories`
--

CREATE TABLE `userstories` (
  `usID` varchar(255) NOT NULL,
  `asA` varchar(255) NOT NULL,
  `iWant` varchar(255) NOT NULL,
  `soThat` varchar(255) NOT NULL,
  `usDesc` varchar(255) NOT NULL,
  `usFlag` int(11) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `createdBy` varchar(255) NOT NULL,
  `createdOn` date NOT NULL,
  `projectID` varchar(255) NOT NULL,
  `parentID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userstories`
--

INSERT INTO `userstories` (`usID`, `asA`, `iWant`, `soThat`, `usDesc`, `usFlag`, `priority`, `createdBy`, `createdOn`, `projectID`, `parentID`) VALUES
('project1557288431222', 'ds', 'ds', 'ds', 'ds', 0, 'High', 'ramireddyseelam1@gmail.com', '2019-05-08', '\"12345\"', ''),
('project1557289189156', 'sdaf', 'SS', 'sadsda', 's', 0, 'High', 'kartheek@nmsu.edu', '2019-05-08', '\"12345\"', ''),
('project1557289226197', 'aa', 'aaa', 'A', 'a', 0, 'Medium', 'ramireddyseelam1@gmail.com', '2019-05-08', '\"12345\"', ''),
('project1557289300726', 'ff', 'ff', 'ff', 'ff', 0, 'High', 'kartheek@nmsu.edu', '2019-05-08', '\"124\"', ''),
('project1557289582652', 'rwe', 'wer', 'ewr', 'wer', 0, 'Low', 'kartheek@nmsu.edu', '2019-05-08', '\"124\"', ''),
('project1557289686485', 'w', 'w', 'wq', 'wq', 0, 'Medium', 'kartheek@nmsu.edu', '2019-05-08', '\"qq\"', ''),
('project1557289740755', 'sa', 'sa', 'AaSD', 'sa', 0, 'High', 'ramireddyseelam1@gmail.com', '2019-05-08', '', '\"project1557288431222\"');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userstories`
--
ALTER TABLE `userstories`
  ADD PRIMARY KEY (`usID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
