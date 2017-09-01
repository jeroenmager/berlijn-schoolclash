-- phpMyAdmin SQL Dump
-- version 4.3.0
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Gegenereerd op: 24 jul 2017 om 10:10
-- Serverversie: 5.5.38-MariaDB
-- PHP-versie: 5.5.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `schoolclash`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `results`
--

CREATE TABLE IF NOT EXISTS `results` (
`id` int(11) NOT NULL,
  `questionName` varchar(512) NOT NULL,
  `answered` varchar(512) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `results`
--

INSERT INTO `results` (`id`, `questionName`, `answered`) VALUES
(1, 'first question, second question, third question, fourth question, fifth question', 'question 1: answer 4, question 2: answer 4, question 3: answer 2, question 4: answer 3, question 5: answer 1'),
(2, 'first question, second question, third question, fourth question, fifth question', 'question 1: answer 4, question 2: answer 4, question 3: answer 2, question 4: answer 3, question 5: answer 1'),
(3, 'first question, second question, third question, fourth question, fifth question', 'question 1: answer 4, question 2: answer 4, question 3: answer 2, question 4: answer 3, question 5: answer 1'),
(4, 'first question, second question, third question, fourth question, fifth question', 'question 1: answer 4, question 2: answer 4, question 3: answer 2, question 4: answer 3, question 5: answer 1'),
(5, 'first question, second question, third question, fourth question, fifth question', 'question 1: answer 3, question 2: answer 1, question 3: answer 1, question 4: answer 4, question 5: answer 3'),
(6, 'Coca-Cola, Tetris, Sahara, Slakken, Spieren', 'Hoesselijn, 23, 10%, 1 jaar, Tong');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `results`
--
ALTER TABLE `results`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `results`
--
ALTER TABLE `results`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
