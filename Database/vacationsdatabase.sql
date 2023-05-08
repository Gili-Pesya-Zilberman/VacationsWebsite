-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2023 at 07:14 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 20),
(2, 22),
(2, 26),
(2, 29),
(2, 31),
(7, 26),
(7, 27),
(8, 24),
(8, 27),
(8, 34),
(9, 20),
(10, 21),
(11, 24),
(13, 27),
(14, 25),
(14, 27);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Gili Pesya', 'Zilberman', 'gili@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'Admin'),
(2, 'Dana', 'Zilberman', 'dana@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(7, 'Rani', 'Adler', 'rani@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(8, 'Noa', 'Drieblatt', 'noa@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(9, 'Ziv', 'Adler', 'ziv@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(10, 'Yahav', 'Zilberman', 'yahav@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(11, 'Shani', 'Sova', 'shan@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(12, 'Dan', 'Hampry', 'dan@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(13, 'Guy', 'Ozer', 'guy@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(14, 'Noga', 'Brenner', 'noga@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(15, 'Yarden', 'Shapiro', 'yarden@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(20, 'London', 'London is a vibrant and dynamic city that combines history, culture, and modernity. It\'s a melting pot of diverse communities and a hub of international business and commerce. With world-famous landmarks such as Big Ben, the Tower of London, and Buckingham Palace, as well as a plethora of museums, galleries, and theaters, London is a must-visit destination for any traveler', '2023-04-10', '2023-04-15', '5000.00', '77ea4cbe-d96f-4413-9004-0a53cc523bbc.jpeg'),
(21, 'Paris', 'Paris, the City of Light, is one of the most romantic and enchanting cities in the world. From the stunning architecture of the Eiffel Tower to the world-famous art of the Louvre Museum, Paris is a city that never fails to captivate. Stroll along the Seine River, indulge in delicious French cuisine, or simply soak up the atmosphere in charming neighborhoods like Montmartre or Le Marais. Paris is a city that should be on everyone\'s bucket list', '2023-02-02', '2023-02-28', '7000.00', '103cb100-bbde-481b-baec-9344bb46c39b.jpeg'),
(22, 'New York', 'New York City, the city that never sleeps, is a metropolis that is bursting with energy and excitement. From the bright lights of Times Square to the towering skyscrapers of the skyline, there is always something to see and do. Explore the city\'s diverse neighborhoods, indulge in world-class cuisine, or take in the iconic sights like the Statue of Liberty and Central Park. New York City is a city that truly has something for everyone', '2023-03-11', '2023-03-18', '9500.00', 'bda3a711-9cfd-4787-a5bb-706f0a9ae1c3.jpeg'),
(23, 'Las Vegas', 'Las Vegas is a city that\'s synonymous with entertainment, excitement, and luxury. It\'s a destination for travelers who want to experience the ultimate in nightlife, gambling, and world-class entertainment. With its iconic landmarks such as the Bellagio Fountains, the Strip, and the Hoover Dam, Las Vegas promises an unforgettable vacation experience', '2023-06-06', '2023-06-13', '8000.00', '661f0018-7f84-4b64-a7c6-cdacf71eca02.jpeg'),
(24, 'Barcelona', 'Barcelona, the vibrant capital of Catalonia, is a city that is as cosmopolitan as it is historic. From the stunning architecture of Gaudi\'s masterpieces to the lively beaches of Barceloneta, there is always something to see and do in this enchanting city. Indulge in delicious tapas, soak up the art and culture, or simply take in the stunning views from Park Guell. Barcelona is a city that truly has it all', '2022-12-31', '2023-01-07', '3500.00', 'bb695e59-7d85-4da3-8d9a-4065f256fcc2.jpeg'),
(25, 'Santorini', 'Santorini is a stunning Greek island that\'s famous for its breathtaking views, picturesque villages, and beautiful sunsets. It\'s a destination for travelers who are seeking relaxation, romance, and natural beauty. With its iconic blue-domed churches, black sand beaches, and delicious Mediterranean cuisine, Santorini promises an unforgettable vacation experience', '2023-08-26', '2023-09-03', '6000.00', '23db4ada-a35f-4032-912d-ac917e67c986.jpeg'),
(26, 'Rome', 'Rome, the Eternal City, is one of the world\'s most popular destinations. Steeped in history and culture, visitors can wander through ancient ruins, marvel at stunning architecture, and indulge in delicious Italian cuisine. Whether you\'re exploring the Colosseum, tossing a coin into the Trevi Fountain, or simply strolling through charming neighborhoods, Rome is a city that captivates the senses and leaves a lasting impression', '2022-11-16', '2022-12-15', '4300.00', 'bbfa433b-32e5-4e7a-a1ef-f10cf972f7b4.jpeg'),
(27, 'Amsterdam', 'Amsterdam, the capital of the Netherlands, is a city that is known for its picturesque canals, world-famous museums, and vibrant nightlife. Explore the city\'s charming neighborhoods, indulge in delicious Dutch cuisine, or take in the art at the Van Gogh Museum. Amsterdam is a city that is both beautiful and fun, and is a must-visit for any traveler', '2023-03-19', '2023-03-26', '5000.00', 'f47feaa3-10bb-4812-b5b2-0ba80e617c77.jpeg'),
(28, 'Maldives', 'The Maldives is a paradise on earth with its crystal clear waters, white sandy beaches, and stunning coral reefs. It\'s a perfect destination for those who want to relax and unwind amidst breathtaking natural beauty. With a plethora of water sports activities, luxurious resorts, and exceptional cuisine, the Maldives promises an unforgettable vacation experience', '2023-03-30', '2023-04-06', '10000.00', '0178389e-3198-4056-8c00-05c1544a2feb.jpeg'),
(29, 'Tokyo', 'Tokyo, the bustling capital of Japan, is a city that is both futuristic and steeped in tradition. With its towering skyscrapers, bright lights, and high-tech gadgets, it\'s easy to feel like you\'re in a different world. But the city also boasts tranquil gardens, historic temples, and world-renowned cuisine. Whether you\'re exploring the vibrant neighborhoods of Shibuya and Shinjuku, or taking in the serene beauty of the Imperial Palace, Tokyo is a city that never fails to amaze', '2023-01-01', '2023-01-08', '8200.00', 'f2421d5a-3686-476d-9bc5-3e3b90e0de4f.jpeg'),
(30, 'San Francisco ', 'San Francisco is a vibrant city on the west coast of the United States that offers an unforgettable vacation experience. With its iconic landmarks like the Golden Gate Bridge and Alcatraz Island, diverse neighborhoods, and rich cultural heritage, San Francisco has something for everyone. Visitors can explore world-class museums, enjoy delicious cuisine, or take a stroll through the picturesque parks and gardens. Whether you\'re a first-time visitor or a seasoned traveler, San Francisco is a destination that is sure to leave you with lasting memories', '2023-09-02', '2023-09-09', '7800.00', '78ce1208-6cd4-4a64-9b41-d142b063107f.jpeg'),
(31, 'Berlin', 'Berlin, the capital of Germany, is a city that is rich in history and culture. From the remnants of the Berlin Wall to the stunning architecture of the Brandenburg Gate, there is always something to discover. Explore the city\'s vibrant art scene, indulge in delicious German cuisine, or take in the bustling energy of neighborhoods like Kreuzberg and Friedrichshain. Berlin is a city that is full of surprises and is a must-visit for any traveler', '2023-02-18', '2023-02-25', '4500.00', 'd27c2ec3-b10a-4737-bcff-d63871cd2f8c.jpeg'),
(32, 'Prauge', 'Prague, the capital of the Czech Republic, is a city that is steeped in history and charm. From the stunning architecture of the Charles Bridge to the Gothic beauty of St. Vitus Cathedral, there is always something to discover. Explore the city\'s vibrant art scene, indulge in delicious Czech cuisine, or take in the stunning views from Petrin Hill. Prague is a city that is full of surprises and is a must-visit for any traveler', '2023-02-01', '2023-03-11', '5500.00', '91454005-6acf-42da-ba29-08d71944925a.jpeg'),
(33, 'Los Angeles', 'Los Angeles is a city of dreams, known for its sunny weather, beaches, and Hollywood glamour. It\'s a destination for travelers who are seeking a mix of culture, entertainment, and relaxation. With world-famous attractions such as the Hollywood Walk of Fame, Universal Studios Hollywood, and Santa Monica Pier, Los Angeles promises an exciting and unforgettable vacation experience', '2023-06-03', '2023-06-10', '9500.00', '0da2a102-9777-4b11-b355-10755a747d4d.jpeg'),
(34, 'Venice', 'Venice is a romantic and picturesque city that\'s built on a network of canals. It\'s a city that\'s steeped in history and culture, with stunning architecture and art at every turn. Whether you\'re taking a gondola ride along the Grand Canal, exploring the narrow alleyways and hidden courtyards, or enjoying a delicious meal at a local trattoria, Venice promises an unforgettable vacation experience', '2023-04-28', '2023-05-05', '6900.00', 'fe2cfa80-8eac-41ad-b402-fdf4c00907fa.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
