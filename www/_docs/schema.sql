-- phpMyAdmin SQL Dump
-- version 3.3.2deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 17, 2011 at 09:08 PM
-- Server version: 5.1.41
-- PHP Version: 5.3.2-1ubuntu4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `joegatt-net-production`
--

-- --------------------------------------------------------

--
-- Table structure for table `annotations`
--

CREATE TABLE IF NOT EXISTS `annotations` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` longtext NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `score` int(11) NOT NULL DEFAULT '0',
  `book_id` int(10) unsigned NOT NULL DEFAULT '0',
  `sequence` int(10) unsigned NOT NULL DEFAULT '0',
  `paragraph_id` int(10) unsigned NOT NULL DEFAULT '0',
  `unique_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `unique_id` (`unique_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=73 ;

-- --------------------------------------------------------

--
-- Table structure for table `character_count`
--

CREATE TABLE IF NOT EXISTS `character_count` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sequence` int(10) unsigned NOT NULL DEFAULT '0',
  `book_id` int(10) unsigned NOT NULL DEFAULT '0',
  `count` double NOT NULL DEFAULT '0',
  `label` char(1) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `sequence_label` (`sequence`,`label`,`book_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=59294 ;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` longtext NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `score` int(11) NOT NULL DEFAULT '0',
  `book_id` int(10) unsigned DEFAULT NULL,
  `sequence` int(10) unsigned DEFAULT NULL,
  `paragraph_id` int(10) unsigned DEFAULT NULL,
  `unique_id` int(10) unsigned DEFAULT NULL,
  `page_id` varchar(20) NOT NULL,
  `type` int(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `unique_id` (`unique_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=168 ;

-- --------------------------------------------------------

--
-- Table structure for table `log_broadcast`
--

CREATE TABLE IF NOT EXISTS `log_broadcast` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(141) NOT NULL,
  `date_created` datetime NOT NULL,
  `broadcast` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=103 ;

-- --------------------------------------------------------

--
-- Table structure for table `popularity`
--

CREATE TABLE IF NOT EXISTS `popularity` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL,
  `page_id` varchar(20) NOT NULL,
  `type` int(1) unsigned NOT NULL DEFAULT '1',
  `external` varchar(20) NOT NULL,
  `count` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Index_2` (`page_id`,`external`,`type`,`url`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=109 ;

-- --------------------------------------------------------

--
-- Table structure for table `source_text`
--

CREATE TABLE IF NOT EXISTS `source_text` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` longtext NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `book_id` int(10) unsigned NOT NULL DEFAULT '0',
  `sequence` int(10) unsigned NOT NULL DEFAULT '0',
  `style` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `page` int(10) unsigned DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `sequence` (`sequence`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=37576 ;

-- --------------------------------------------------------

--
-- Table structure for table `target_text`
--

CREATE TABLE IF NOT EXISTS `target_text` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` longtext NOT NULL,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `version` int(10) unsigned NOT NULL DEFAULT '0',
  `sequence` int(10) unsigned NOT NULL DEFAULT '0',
  `base_id` int(10) unsigned NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `book_id` int(10) unsigned NOT NULL DEFAULT '0',
  `score` int(10) NOT NULL DEFAULT '0',
  `score_total` int(10) unsigned NOT NULL DEFAULT '0',
  `restore_point` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39046 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL DEFAULT '',
  `email` varchar(45) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `visits` int(10) unsigned NOT NULL DEFAULT '0',
  `confirmation_code` varchar(64) NOT NULL,
  `date_confirmed` datetime DEFAULT NULL,
  `date_last_visit` datetime DEFAULT NULL,
  `signup_url` varchar(100) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `geo` varchar(2) DEFAULT NULL,
  `rmcode` varchar(64) DEFAULT NULL,
  `rmcode2` varchar(64) DEFAULT NULL,
  `rmcode3` varchar(64) DEFAULT NULL,
  `level` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10008 ;

-- --------------------------------------------------------

--
-- Table structure for table `variables`
--

CREATE TABLE IF NOT EXISTS `variables` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `value` longtext,
  `id1` int(10) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `dateModified` datetime DEFAULT NULL,
  `usersId` int(10) unsigned NOT NULL DEFAULT '0',
  `privacy` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nameId` (`id1`,`name`,`usersId`),
  KEY `dateCreated` (`dateCreated`),
  KEY `name` (`name`),
  KEY `usersId` (`usersId`),
  KEY `privacy` (`privacy`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `votes_notes`
--

CREATE TABLE IF NOT EXISTS `votes_notes` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `vote` int(1) unsigned NOT NULL DEFAULT '0',
  `note_id` int(10) unsigned NOT NULL DEFAULT '0',
  `voter_id` int(10) unsigned NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
