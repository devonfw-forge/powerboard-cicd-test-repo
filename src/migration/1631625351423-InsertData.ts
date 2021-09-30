import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1631625351423 implements MigrationInterface {
  name = 'InsertData1631625351423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98655bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Valencia');`,
    );
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98755bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Mumbai');`,
    );
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98855bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Poland');`,
    );
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98955bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Murcia');`,
    );

    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('99055bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Bangalore');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_status"("id", "status_name","status_description") Values(1,'on_track','If everything is all right' );`,
    );

    await queryRunner.query(
      `INSERT INTO "team_status"("id", "status_name","status_description") Values(2,'off_track','If everything is all right' );`,
    );

    await queryRunner.query(
      `INSERT INTO "team_status"("id", "status_name","status_description") Values(3,'potential_risks','If everything is not good' );`,
    );

    await queryRunner.query(
      `INSERT INTO "team" ("id","team_code", "project_key", "name", "ad_center_id","team_status_id","logo") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d488e' ,'10012345','P12343','Team A','99055bf7-ada7-495c-8019-8d7ab62d488e',1,'logo_Aa4aa8e7a-85d6-4b75-8f93-6a11dee9b13c.png');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id","team_code","project_key", "name", "ad_center_id","team_status_id","logo") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d489e' ,'10012346','P1212' ,'Team B','99055bf7-ada7-495c-8019-8d7ab62d488e',1,'logo_B2dd2f2b41-3f0f-44dc-9598-05acc1569771.png');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id", "team_code","project_key","name", "ad_center_id","team_status_id","logo") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d490e' ,'10012347','P87695', 'Team C','99055bf7-ada7-495c-8019-8d7ab62d488e',1,'logo_Cba48ed82-f863-455e-b87e-141ac186f992.png');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id", "team_code","project_key","name", "ad_center_id","team_status_id" ,"logo") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d491e' ,'10033347','P43567', 'Team D','98755bf7-ada7-495c-8019-8d7ab62d488e',1 ,'logo_D1ae253f6b-1c9c-4984-a4b5-a91ffb959c50.png');`,
    );

    await queryRunner.query(
      `INSERT INTO "links_category" ("id", "title") VALUES ('10005bf7-ada7-495c-8019-8d7ab62d488e', 'web_link');`,
    );
    await queryRunner.query(
      `INSERT INTO "links_category" ("id", "title") VALUES ('10006bf7-ada7-495c-8019-8d7ab62d488e', 'meeting_link');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('51055bf7-ada6-495c-8019-8d7ab76d488e','10005bf7-ada7-495c-8019-8d7ab62d488e','https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3','Jira cloud','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('51055bf8-ada5-495c-8019-8d7ab76d488e' ,'10005bf7-ada7-495c-8019-8d7ab62d488e','https://github.com/devonfw-forge/powerboard-api/tree/develop-0.0.1','GitHub','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('51055bf2-ada5-495c-8019-8d7ab76d488e' ,'10006bf7-ada7-495c-8019-8d7ab62d488e','https://lync.capgemini.com/capgemini.com/meet/raj.bhushan/L6C7HBQC','Skype Demo','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('51056bf8-ada5-495c-8019-8d7ab76d488e' ,'10006bf7-ada7-495c-8019-8d7ab62d488e','https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d','Stand Up','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('51057bf8-ada5-495c-8019-8d7ab76d488e' ,'10006bf7-ada7-495c-8019-8d7ab62d488e','https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d','Stand Up','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('51055bf9-ada5-495c-8019-8d7ab76d488e' ,'10005bf7-ada7-495c-8019-8d7ab62d488e','https://github.com/devonfw-forge/powerboard-api/tree/develop-0.0.1','GitHub','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('52055bf9-ada5-495c-8019-8d7ab76d488e' ,'10005bf7-ada7-495c-8019-8d7ab62d488e','https://github.com/devonfw-forge/powerboard-api/tree/develop-0.0.1','GitHub','46455bf7-ada7-495c-8019-8d7ab76d489e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('52057bf8-ada5-495c-8019-8d7ab76d488e' ,'10006bf7-ada7-495c-8019-8d7ab62d488e','https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d','Stand Up','46455bf7-ada7-495c-8019-8d7ab76d489e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "link_title", "link" ,"link_name","team_id") VALUES ('53057bf8-ada5-495c-8019-8d7ab76d488e' ,'10006bf7-ada7-495c-8019-8d7ab62d488e','https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d','Stand Up','46455bf7-ada7-495c-8019-8d7ab76d491e');`,
    );

    await queryRunner.query(
      `INSERT INTO "multimedia" ("id", "album_name", "in_slideshow","multimedia_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f385' ,'resort',false,'46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "multimedia" ("id", "album_name", "in_slideshow","multimedia_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f386' ,'farewell',false,'46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "multimedia" ("id", "album_name", "in_slideshow","multimedia_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f387' ,'Carnival',false,'46455bf7-ada7-495c-8019-8d7ab76d489e');`,
    );
    await queryRunner.query(
      `INSERT INTO "multimedia" ("id", "album_name", "in_slideshow","multimedia_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f388' ,'birthday',true,'46455bf7-ada7-495c-8019-8d7ab76d489e');`,
    );
    await queryRunner.query(
      `INSERT INTO "multimedia" ("id", "album_name","in_slideshow", "multimedia_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f389' ,'anniversary',false,'46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );
    await queryRunner.query(
      `INSERT INTO "multimedia" ("id", "album_name", "in_slideshow","multimedia_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f390' ,'festival',false,'46455bf7-ada7-495c-8019-8d7ab76d491e');`,
    );
    await queryRunner.query(
      `INSERT INTO "multimedia" ("id", "file_name", "in_slideshow","multimedia_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f391' ,'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',true,'46455bf7-ada7-495c-8019-8d7ab76d491e');`,
    );

    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f385' ,'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f385');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('89cbb47b-5454-440d-a0e8-98b681ed6f83' ,'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f385');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('fbf8ea11-62a2-433a-936f-9fddfb90b1c6' ,'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f387');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('dc6a6a55-23f9-4edf-90e5-a18c6b07a0be' ,'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f387');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('8c4f8d5d-b3b7-4efb-868e-4336474094b3' ,'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f390');`,
    );

    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('73eaf00a-f1fe-4573-8cbb-324499c39431' ,'altrand72e3352-0353-4e5f-8fa3-5a25444f0c62.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f390');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('b76075b9-744b-46d8-adce-ed94efbdc91d' ,'manyata_collagedbd58693-3e4a-4e88-9b98-35db5f8b5582.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f389');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('df6f2d70-cd9e-48dd-8040-e15fe0cd9e4d' ,'media-handler5eb3609d-b8ab-4c2d-abb0-0d434076c4e9.jpg','aaad19f7-1b66-44aa-a443-4fcdd173f389');`,
    );

    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('36078c40-6667-4a15-bd5f-38d0c74fb006' ,'CapgeminiPurpose3258001d-dc2b-4208-afb4-f5a66f2af697.mp4','aaad19f7-1b66-44aa-a443-4fcdd173f386');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('a8647b04-6e0e-4797-8f79-e8f239c4b406' ,'CapgeminiValues3ece517e-e6d1-4a35-826b-70a09631c24f.mp4','aaad19f7-1b66-44aa-a443-4fcdd173f390');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('430cab3f-3d2b-4266-9b18-6c3804287954' ,'Capgemini_GetTheFutureYouWantbcc079b9-d403-464d-9025-76865f675b6b.mp4','aaad19f7-1b66-44aa-a443-4fcdd173f388');`,
    );
    await queryRunner.query(
      `INSERT INTO "files" ("id", "file_name", "multimedia_album_id") VALUES ('16b0103f-664d-49ad-92ff-c578376a2fba' ,'Services23915c8d-e268-4362-b815-e5885e83b092.mp4','aaad19f7-1b66-44aa-a443-4fcdd173f389');`,
    );

    await queryRunner.query(
      `INSERT INTO "visibility" ("id", "daily_meeting", "team_link","images","videos","visibility_team_id") VALUES ('52455bf8-ada5-495c-8019-8d7ab76d488e',true, true, true, true,'46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "code_smell", "code_coverage" ,"status","team_id" ,"snapshot_time") VALUES ('61055bf8-ada5-495c-8019-8d7ab76d488e' ,5, 21, 80,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d490e','2021-07-06 02:10:55');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "code_smell", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES ('61155bf8-ada5-495c-8019-8d7ab76d488e' ,3, 4, 90 ,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d488e', '2021-07-06 13:23:22');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "code_smell", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES ('61255bf8-ada5-495c-8019-8d7ab76d488e' ,3, 13, 85 ,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d488e', '2021-07-06 14:30:22');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "code_smell", "code_coverage" ,"status","team_id" ,"snapshot_time") VALUES ('61355bf8-ada5-495c-8019-8d7ab76d488e' ,39, 51, 30,'FAILED','46455bf7-ada7-495c-8019-8d7ab76d491e','2021-07-06 02:10:55');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "code_smell", "code_coverage" ,"status","team_id" ,"snapshot_time") VALUES ('61455bf8-ada5-495c-8019-8d7ab76d488e' ,5, 31, 82,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d489e','2021-07-06 02:10:55');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_metric" ("id","name" ) VALUES ('11155bf2-ada5-495c-8019-8d7ab76d488e','Work Completed');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_metric" ("id","name" ) VALUES ('11155bf1-ada5-495c-8019-8d7ab76d488e','Work Committed');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_status" ("id","status" ) VALUES ('11155bf2-ada5-495c-8019-8d7ab76d488e','In Progress');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_status" ("id","status" ) VALUES ('11155bf3-ada5-495c-8019-8d7ab76d488e','Completed');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_work_unit" ("id","work_unit" ) VALUES ('11155bf1-ada5-495c-8019-8d7ab76d488e','hour');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_work_unit" ("id","work_unit" ) VALUES ('11155bf2-ada5-495c-8019-8d7ab76d488e','story point');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20155bf8-ada5-495c-8019-8d7ab76d488e', 9, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-07-27 16:30:15', '2021-08-24 16:30:15','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20255bf8-ada5-495c-8019-8d7ab76d488e', 10, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-08-25 16:30:15', '2021-09-22 16:30:15','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20355bf8-ada5-495c-8019-8d7ab76d488e', 11, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-09-23 13:30:15', '2021-10-21 13:30:15','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e' );`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20455bf8-ada5-495c-8019-8d7ab76d488e', 21, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-08-25 14:30:15', '2021-09-22 14:30:15','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20555bf8-ada5-495c-8019-8d7ab76d488e', 22, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-09-23 15:30:15', '2021-10-21 15:30:15','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20655bf8-ada5-495c-8019-8d7ab76d488e', 21, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-08-25 14:30:15', '2021-09-22 14:30:15','46455bf7-ada7-495c-8019-8d7ab76d489e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20755bf8-ada5-495c-8019-8d7ab76d488e', 22, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-09-23 15:30:15', '2021-10-21 15:30:15','46455bf7-ada7-495c-8019-8d7ab76d489e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20855bf8-ada5-495c-8019-8d7ab76d488e', 21, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-08-25 14:30:15', '2021-09-22 14:30:15','46455bf7-ada7-495c-8019-8d7ab76d491e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20955bf8-ada5-495c-8019-8d7ab76d488e', 22, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-09-23 15:30:15', '2021-10-21 15:30:15','46455bf7-ada7-495c-8019-8d7ab76d491e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES ('20111bf8-ada5-495c-8019-8d7ab76d488e', 8, '20355bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES ('20112bf8-ada5-495c-8019-8d7ab76d488e', 9, '20555bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES ('20113bf8-ada5-495c-8019-8d7ab76d488e', 7, '20455bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_spirit_median" ("id", "survey_median","start_date","end_date","survey_code","team_name") VALUES ('70013bf8-ada5-495c-8019-8d7ab76d488e', 8,'2021-05-15 14:15:36','2021-05-25 14:15:30' ,'AZR32' ,'Team A');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_spirit_median" ("id", "survey_median","start_date","end_date","survey_code","team_name") VALUES ('70023bf8-ada5-495c-8019-8d7ab76d488e', 9,'2021-06-22 13:20:34','2021-07-02 13:25:40' ,'AZ4r52' ,'Team C');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_spirit_median" ("id", "survey_median","start_date","end_date","survey_code","team_name") VALUES ('70033bf8-ada5-495c-8019-8d7ab76d488e', 7,'2021-06-22 13:20:34','2021-07-02 13:25:40' ,'AZ4r52' ,'Team B');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_spirit_median" ("id", "survey_median","start_date","end_date","survey_code","team_name") VALUES ('70043bf8-ada5-495c-8019-8d7ab76d488e', 7,'2021-06-22 13:20:34','2021-07-02 13:25:40' ,'AZ4r52' ,'Team D');`,
    );

    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20111bf8-ada5-495c-8019-8d7ab76d488e', 8,'20355bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20112bf8-ada5-495c-8019-8d7ab76d488e', 8, '20255bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20113bf8-ada5-495c-8019-8d7ab76d488e', 5, '20455bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20114bf8-ada5-495c-8019-8d7ab76d488e', 7, '20555bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20115bf8-ada5-495c-8019-8d7ab76d488e', 7, '20655bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20116bf8-ada5-495c-8019-8d7ab76d488e', 7, '20755bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20117bf8-ada5-495c-8019-8d7ab76d488e', 4, '20855bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20118bf8-ada5-495c-8019-8d7ab76d488e', 5, '20955bf8-ada5-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80155bf8-ada5-495c-8019-8d7ab76d488e', '20355bf8-ada5-495c-8019-8d7ab76d488e','2021-09-26 15:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80255bf8-ada5-495c-8019-8d7ab76d488e', '20355bf8-ada5-495c-8019-8d7ab76d488e','2021-09-26 19:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80355bf8-ada5-495c-8019-8d7ab76d488e', '20555bf8-ada5-495c-8019-8d7ab76d488e','2021-09-26 19:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80455bf8-ada5-495c-8019-8d7ab76d488e', '20255bf8-ada5-495c-8019-8d7ab76d488e','2021-09-10 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80555bf8-ada5-495c-8019-8d7ab76d488e', '20155bf8-ada5-495c-8019-8d7ab76d488e','2021-08-10 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80655bf8-ada5-495c-8019-8d7ab76d488e', '20455bf8-ada5-495c-8019-8d7ab76d488e','2021-09-10 14:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80755bf8-ada5-495c-8019-8d7ab76d488e', '20755bf8-ada5-495c-8019-8d7ab76d488e','2021-09-26 19:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80855bf8-ada5-495c-8019-8d7ab76d488e', '20955bf8-ada5-495c-8019-8d7ab76d488e','2021-09-26 19:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80955bf8-ada5-495c-8019-8d7ab76d488e', '20655bf8-ada5-495c-8019-8d7ab76d488e','2021-09-10 19:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('81055bf8-ada5-495c-8019-8d7ab76d488e', '20855bf8-ada5-495c-8019-8d7ab76d488e','2021-09-10 19:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90155bf8-ada5-495c-8019-8d7ab76d488e', '80155bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e',140);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90255bf8-ada5-495c-8019-8d7ab76d488e', '80155bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e',7);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90355bf8-ada5-495c-8019-8d7ab76d488e', '80255bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e',140);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90455bf8-ada5-495c-8019-8d7ab76d488e', '80255bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e', 57);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90555bf8-ada5-495c-8019-8d7ab76d488e','80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 112);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90655bf8-ada5-495c-8019-8d7ab76d488e', '80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 34);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90755bf8-ada5-495c-8019-8d7ab76d488e', '80455bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 140);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90855bf8-ada5-495c-8019-8d7ab76d488e', '80455bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 120);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90955bf8-ada5-495c-8019-8d7ab76d488e', '80555bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e', 120);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91055bf8-ada5-495c-8019-8d7ab76d488e', '80555bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e', 110);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91155bf8-ada5-495c-8019-8d7ab76d488e', '80655bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e', 100);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91255bf8-ada5-495c-8019-8d7ab76d488e', '80655bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 90);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91355bf8-ada5-495c-8019-8d7ab76d488e', '80755bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 80);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91455bf8-ada5-495c-8019-8d7ab76d488e', '80755bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 30);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91555bf8-ada5-495c-8019-8d7ab76d488e', '80855bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 80);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91655bf8-ada5-495c-8019-8d7ab76d488e', '80855bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 15);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91755bf8-ada5-495c-8019-8d7ab76d488e', '80955bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 90);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91855bf8-ada5-495c-8019-8d7ab76d488e', '80955bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 80);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91955bf8-ada5-495c-8019-8d7ab76d488e', '81055bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 100);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('92055bf8-ada5-495c-8019-8d7ab76d488e', '81055bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 90);`,
    );

    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password","email" ) Values('10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'raj11' ,'$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme','raj@mail.com');`,
    );

    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "email") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'siva11' ,'$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme','siva@mail.com');`,
    );

    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "email") Values('35afbdf8-9035-4bc6-ae04-28c6140495ad', 'system' ,'$2b$12$bv3gEToQOb4X/dkoHprAY.MHwBJpCeJpFbv1eElwTmoFeBuXtOSsS','powerboardsys@mail.com');`,
    );

    //Here user session entry
    await queryRunner.query(
      `INSERT INTO "user_session"("id", "user_id","is_password_changed","last_checked_project_id") Values('55cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',true,null);`,
    );
    await queryRunner.query(
      `INSERT INTO "user_session"("id", "user_id","is_password_changed","last_checked_project_id") Values('56cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',true,null);`,
    );
    await queryRunner.query(
      `INSERT INTO "user_session"("id", "user_id","is_password_changed","last_checked_project_id") Values('57cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','35afbdf8-9035-4bc6-ae04-28c6140495ad',true,null);`,
    );

    //Here role table entry is there
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','team_member' );`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','team_admin' );`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','system_admin' );`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('558f1dfd-43e9-4cc4-8257-a6ba5c70e34d','guest_user' );`,
    );

    //Here userId and corresponding teamId with their role has been given
    await queryRunner.query(
      `INSERT INTO "user_team"("id","user_Id","user_role_id") Values('61c80b70-e33a-4a1e-ac70-57eaa1c762cd','35afbdf8-9035-4bc6-ae04-28c6140495ad','557f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team"("id","user_Id", "team_Id","user_role_id") Values('762f1dfd-43e9-4cc4-8257-a6ba5c70e33d','10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','46455bf7-ada7-495c-8019-8d7ab76d488e','555f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team"("id" ,"user_Id", "team_Id","user_role_id" ) Values('763f1dfd-43e9-4cc4-8257-a6ba5c70e33d','11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','46455bf7-ada7-495c-8019-8d7ab76d489e','555f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team"("id" ,"user_Id", "team_Id" ,"user_role_id") Values('764f1dfd-43e9-4cc4-8257-a6ba5c70e33d','11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','46455bf7-ada7-495c-8019-8d7ab76d490e','556f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );

    //Here we are adding privileges
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80011dfd-43e9-4cc4-8257-a6ba5c70e34d','add_team_admin','For admin to determine role' );`,
    );
    //   await queryRunner.query(
    //     `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80021dfd-43e9-4cc4-8257-a6ba5c70e34d','view_meeting_links','For viewing meetings' );`,
    //   );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80031dfd-43e9-4cc4-8257-a6ba5c70e34d','view_links' ,'For viewing links');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80051dfd-43e9-4cc4-8257-a6ba5c70e34d','team_configuration','For configuring the team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80061dfd-43e9-4cc4-8257-a6ba5c70e34d','register_team','For register of team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80071dfd-43e9-4cc4-8257-a6ba5c70e34d','update_team','For updating the team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80081dfd-43e9-4cc4-8257-a6ba5c70e34d','delete_team' ,'For deleting the team');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80091dfd-43e9-4cc4-8257-a6ba5c70e34d','view_all_team' ,'View all team');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80101dfd-43e9-4cc4-8257-a6ba5c70e34d','view_members_of_team','view members of particular team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80111dfd-43e9-4cc4-8257-a6ba5c70e34d','update_role' ,'For updating the role');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80121dfd-43e9-4cc4-8257-a6ba5c70e34d','delete_team_members','For deleting the team members' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80131dfd-43e9-4cc4-8257-a6ba5c70e34d','add_team_member', 'For adding team meber' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80141dfd-43e9-4cc4-8257-a6ba5c70e34d','add_guest_user' ,'For adding guest user');`,
    );
    //Here we relate roleId to PrivilegeId
    //for team member and their respective permission id
    //   await queryRunner.query(
    //     `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    //   );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );

    //For team admin , and respective permission id

    //   await queryRunner.query(
    //     `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    //   );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80051dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80101dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80121dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80131dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    //For system admin , and their respective permission id
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80011dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    //   await queryRunner.query(
    //     `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    //   );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80051dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80061dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80071dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80081dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80091dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80101dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80111dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80121dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80131dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80141dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role_privilege" DROP CONSTRAINT "FK_97a74e8a9913478806bd9258dea"`);
    await queryRunner.query(`ALTER TABLE "user_role_privilege" DROP CONSTRAINT "FK_b5953b98d1159f75a3156d071a9"`);
    await queryRunner.query(`ALTER TABLE "visibility" DROP CONSTRAINT "FK_396c9b89d74447b5dd2e60b9b24"`);
    await queryRunner.query(`ALTER TABLE "team_links" DROP CONSTRAINT "FK_e2facb7b8634882f8a0ee04979f"`);
    await queryRunner.query(`ALTER TABLE "team_links" DROP CONSTRAINT "FK_abb01893e179023bcfcce0e6ea6"`);
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_2d5c878843b5fb237d9633960cb"`);
    await queryRunner.query(`ALTER TABLE "multimedia" DROP CONSTRAINT "FK_2ff4d18f9dd41c4eb24e891d47f"`);
    await queryRunner.query(`ALTER TABLE "team_spirit" DROP CONSTRAINT "FK_c258101a9e329fc1cf1ca460195"`);
    await queryRunner.query(`ALTER TABLE "team_spirit_median" DROP CONSTRAINT "FK_103f28512266352104e3edea624"`);
    await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_32ee1ecd7212edf6dad1a86ee6a"`);
    await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_ea96cf0fa988134725f6ad0984b"`);
    await queryRunner.query(`ALTER TABLE "sprint_snapshot" DROP CONSTRAINT "FK_fb748d58ef594e8505aa9970d98"`);
    await queryRunner.query(`ALTER TABLE "code_quality_snapshot" DROP CONSTRAINT "FK_03be61d9d46dd39f1f355862e32"`);
    await queryRunner.query(`ALTER TABLE "client_status" DROP CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_b376aaa2ef5e4724f3508cf5f33"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_738321a380b6d8e5266516b5302"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_39768350e23ee9800f4b30bb94f"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_0c4cda0f5bdb141e7cdccb9c563"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_8d8673f465f0797bf6126766c96"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_f7c7dca694de337fa4a89d73ec8"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_659c6ff656130dcfac850b66c38"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_8e571805766848ea10996a178d4"`);
    await queryRunner.query(`DROP INDEX "IDX_97a74e8a9913478806bd9258de"`);
    await queryRunner.query(`DROP INDEX "IDX_b5953b98d1159f75a3156d071a"`);
    await queryRunner.query(`DROP TABLE "user_role_privilege"`);
    await queryRunner.query(`DROP TABLE "visibility"`);
    await queryRunner.query(`DROP TABLE "team_links"`);
    await queryRunner.query(`DROP TABLE "links_category"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "multimedia"`);
    await queryRunner.query(`DROP TABLE "team_spirit"`);
    await queryRunner.query(`DROP TABLE "team_spirit_median"`);
    await queryRunner.query(`DROP TABLE "sprint_snapshot_metric"`);
    await queryRunner.query(`DROP TABLE "sprint_snapshot"`);
    await queryRunner.query(`DROP TABLE "sprint_metric"`);
    await queryRunner.query(`DROP TABLE "code_quality_snapshot"`);
    await queryRunner.query(`DROP TABLE "client_status"`);
    await queryRunner.query(`DROP TABLE "sprint"`);
    await queryRunner.query(`DROP TABLE "sprint_work_unit"`);
    await queryRunner.query(`DROP TABLE "sprint_status"`);
    await queryRunner.query(`DROP TABLE "user_team"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "team_status"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_session"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "privileges"`);
    await queryRunner.query(`DROP TABLE "ad_center"`);
  }
}
