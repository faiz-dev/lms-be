/*
 Navicat Premium Dump SQL

 Source Server         : lokal
 Source Server Type    : MySQL
 Source Server Version : 80403 (8.4.3)
 Source Host           : localhost:3306
 Source Schema         : quiz-app

 Target Server Type    : MySQL
 Target Server Version : 80403 (8.4.3)
 File Encoding         : 65001

 Date: 24/01/2026 14:25:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `questions_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `attempts_id` int NOT NULL,
  `score` int NOT NULL,
  `status` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `answers_attempts`(`attempts_id` ASC) USING BTREE,
  INDEX `answers_questions`(`questions_id` ASC) USING BTREE,
  CONSTRAINT `answers_attempts` FOREIGN KEY (`attempts_id`) REFERENCES `attempts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `answers_questions` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of answers
-- ----------------------------

-- ----------------------------
-- Table structure for attempts
-- ----------------------------
DROP TABLE IF EXISTS `attempts`;
CREATE TABLE `attempts`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `students_id` int NOT NULL,
  `quiz_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `total_score` int NOT NULL,
  `summary` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `attempts_quiz`(`quiz_id` ASC) USING BTREE,
  INDEX `attempts_students`(`students_id` ASC) USING BTREE,
  CONSTRAINT `attempts_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `attempts_students` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attempts
-- ----------------------------

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(160) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `enrollment_key` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------

-- ----------------------------
-- Table structure for course_content
-- ----------------------------
DROP TABLE IF EXISTS `course_content`;
CREATE TABLE `course_content`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quiz_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` int NOT NULL,
  `file_resource` varchar(160) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `course_content_course`(`course_id` ASC) USING BTREE,
  INDEX `course_content_quiz`(`quiz_id` ASC) USING BTREE,
  CONSTRAINT `course_content_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `course_content_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course_content
-- ----------------------------

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` int NOT NULL,
  `difficulty_level` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `topic` varchar(160) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time_req` int NULL DEFAULT NULL,
  `point` int NULL DEFAULT NULL,
  `cognitive_level` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `keywords` json NULL,
  `estimated_time` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of questions
-- ----------------------------

-- ----------------------------
-- Table structure for quiz
-- ----------------------------
DROP TABLE IF EXISTS `quiz`;
CREATE TABLE `quiz`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(160) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(160) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start_time` timestamp NOT NULL,
  `close_time` timestamp NOT NULL,
  `duration` int NOT NULL,
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `quiz_teacher`(`teacher_id` ASC) USING BTREE,
  CONSTRAINT `quiz_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of quiz
-- ----------------------------

-- ----------------------------
-- Table structure for quiz_questions
-- ----------------------------
DROP TABLE IF EXISTS `quiz_questions`;
CREATE TABLE `quiz_questions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `questions_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `quiz_questions_questions`(`questions_id` ASC) USING BTREE,
  INDEX `quiz_questions_quiz`(`quiz_id` ASC) USING BTREE,
  CONSTRAINT `quiz_questions_questions` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `quiz_questions_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of quiz_questions
-- ----------------------------

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `enrollment_time` int NOT NULL,
  `course_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `students_course`(`course_id` ASC) USING BTREE,
  INDEX `students_users`(`users_id` ASC) USING BTREE,
  CONSTRAINT `students_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `students_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `teacher_users`(`users_id` ASC) USING BTREE,
  CONSTRAINT `teacher_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` int NOT NULL,
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'a.faizmail@gmail.com', 2, '$2b$10$tXtWbZ5LKzj/l4qHFBv7AOWlyAXAYniQvFInBiVIXs1gJEvnjTCqm', '2026-01-18 08:16:28', '2026-01-24 07:26:44', NULL);
INSERT INTO `users` VALUES (2, 'dua@gmail.com', 2, '$2b$10$bVERfsB.p/5tjxWIDykAQuxHHNixPQm7IGPOXfRxC7YHdepGbdSrq', '2026-01-18 10:32:25', '2026-01-22 14:03:08', NULL);
INSERT INTO `users` VALUES (3, 'tiga@gmail.com', 3, '$2b$10$9N1M.PQ0yHekmmTNoYGoeOz7cdf6Q5NdhEi9XTXPN86EiZSU7TprG', '2026-01-18 10:33:16', '2026-01-22 14:40:40', NULL);
INSERT INTO `users` VALUES (4, 'a.faizmaila@gmail.com', 2, '$2b$10$sXoPgF5WFd/zy/8Vkhgm4uSirWeBuWDwR.IJlf4U0aajO8s2/EX.W', '2026-01-18 10:33:49', '2026-01-18 10:33:49', NULL);
INSERT INTO `users` VALUES (5, 'a.faizmail1e@gmail.com', 2, '$2b$10$0G5u2jXv/0IBV3hBMiMDpObtaiydID8nr/87kNgkzbe5cfeiMD66y', '2026-01-18 10:35:50', '2026-01-18 10:35:50', NULL);
INSERT INTO `users` VALUES (6, 'a.faizmaial1e@gmail.com', 2, '$2b$10$JxqFJFzSpvPaZc0MPs2x7eXSMRBS7B6sXZcnXck.DjT8YCjn9h7l2', '2026-01-18 11:55:29', '2026-01-18 11:55:29', NULL);

SET FOREIGN_KEY_CHECKS = 1;
