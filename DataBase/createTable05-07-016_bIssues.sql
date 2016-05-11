use extfamily;
CREATE TABLE `bIssues` (
  `issueId` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(350) CHARACTER SET utf8 NOT NULL,
  `tag` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  `enabled` bit(1) DEFAULT b'1',
  `createdDate` datetime DEFAULT NULL,
  `createdBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateUpdated` datetime DEFAULT NULL,
  `updatedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
 
  PRIMARY KEY (`issueId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




