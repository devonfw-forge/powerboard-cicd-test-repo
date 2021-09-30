import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1631625281680 implements MigrationInterface {
  name = 'CreateTables1631625281680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ad_center" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_e55cde54b4029f701207982ef40" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "privileges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "privilege_name" character varying(255) NOT NULL, "privilege_description" character varying(1000), CONSTRAINT "PK_13f3ff98ae4d5565ec5ed6036cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role_name" character varying(255) NOT NULL, "role_description" character varying(1000), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "is_password_changed" boolean NOT NULL DEFAULT false, "last_checked_project_id" uuid, CONSTRAINT "UQ_13275383dcdf095ee29f2b3455a" UNIQUE ("user_id"), CONSTRAINT "PK_adf3b49590842ac3cf54cac451a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "email" character varying(255), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_status" ("id" SERIAL NOT NULL, "status_name" character varying(255) NOT NULL, "status_description" character varying(1000), CONSTRAINT "PK_92697dc429f17bcf55a604fc717" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "team_code" character varying(255) NOT NULL, "project_key" character varying(255), "logo" character varying(3000), "status_update" boolean NOT NULL DEFAULT true, "ad_center_id" uuid, "team_status_id" integer, CONSTRAINT "UQ_cf461f5b40cf1a2b8876011e1e1" UNIQUE ("name"), CONSTRAINT "UQ_1fdf0262e1eb23aea0b091ea685" UNIQUE ("team_code"), CONSTRAINT "UQ_89241d424525c5c594fed241a6f" UNIQUE ("project_key"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_Id" uuid, "team_Id" uuid, "user_role_id" uuid, CONSTRAINT "PK_155dbc144ff2bd4713fdf1f6c77" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sprint_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, CONSTRAINT "PK_424723b856615d12cff927feb48" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sprint_work_unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "work_unit" character varying NOT NULL, CONSTRAINT "PK_1efd0999b5f820ec7038e807bfd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sprint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sprint_number" integer NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "status" uuid, "team_id" uuid, "work_unit" uuid, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_rating" integer NOT NULL, "sprintId" uuid, CONSTRAINT "REL_16a31ed3a3cc5249369bbd25c9" UNIQUE ("sprintId"), CONSTRAINT "PK_2fcaf8756581eab94bba1d006c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "code_quality_snapshot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bugs" integer NOT NULL, "code_smell" integer NOT NULL, "code_coverage" integer NOT NULL, "status" character varying(255) NOT NULL, "snapshot_time" TIMESTAMP NOT NULL, "team_id" uuid, CONSTRAINT "PK_f8d07080172f9eb6c516154ed48" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sprint_metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_abdcbac9e92b1c6bbd0a44d7cfe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sprint_snapshot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date_time" TIMESTAMP NOT NULL, "sprint_id" uuid, CONSTRAINT "PK_6e1a42261df25461db8e2118701" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sprint_snapshot_metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, "snapshot_id" uuid, "metric_id" uuid, CONSTRAINT "PK_126e53ff91d28e182cd19086006" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_spirit_median" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "survey_median" integer, "start_date" TIMESTAMP, "end_date" TIMESTAMP, "survey_code" character varying, "team_name" character varying(255), CONSTRAINT "PK_a2ed3e2dab5c35a596b4913a55b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_spirit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "team_spirit_rating" integer NOT NULL, "sprint_id" uuid, CONSTRAINT "REL_c258101a9e329fc1cf1ca46019" UNIQUE ("sprint_id"), CONSTRAINT "PK_f4f2b4281be72d5392d9efb8466" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "multimedia" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "album_name" character varying(1000), "file_name" character varying(1000),"in_slideshow" boolean NOT NULL DEFAULT false  ,"multimedia_team_id" uuid, CONSTRAINT "PK_8de2f47ce83e221b35e05e52d0d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "file_name" character varying(3000) NOT NULL, "multimedia_album_id" uuid, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "links_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, CONSTRAINT "PK_42692729856abf63f8081f29394" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "link_name" character varying(255) NOT NULL, "link" character varying(5000) NOT NULL, "link_title" uuid, "team_id" uuid, CONSTRAINT "PK_259fb255d02d3404b08279f41fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "visibility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "daily_meeting" boolean, "team_link" boolean, "images" boolean, "videos" boolean, "visibility_team_id" uuid, CONSTRAINT "REL_396c9b89d74447b5dd2e60b9b2" UNIQUE ("visibility_team_id"), CONSTRAINT "PK_8f15c8e8a76e82ac50fb9cbb110" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role_privilege" ("role_id" uuid NOT NULL, "privilege_id" uuid NOT NULL, CONSTRAINT "PK_b705441b71de9b4c25e25c2e482" PRIMARY KEY ("role_id", "privilege_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_b5953b98d1159f75a3156d071a" ON "user_role_privilege" ("role_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_97a74e8a9913478806bd9258de" ON "user_role_privilege" ("privilege_id") `);
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_8e571805766848ea10996a178d4" FOREIGN KEY ("ad_center_id") REFERENCES "ad_center"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_659c6ff656130dcfac850b66c38" FOREIGN KEY ("team_status_id") REFERENCES "team_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_team" ADD CONSTRAINT "FK_f7c7dca694de337fa4a89d73ec8" FOREIGN KEY ("user_Id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_team" ADD CONSTRAINT "FK_8d8673f465f0797bf6126766c96" FOREIGN KEY ("team_Id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_team" ADD CONSTRAINT "FK_0c4cda0f5bdb141e7cdccb9c563" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD CONSTRAINT "FK_39768350e23ee9800f4b30bb94f" FOREIGN KEY ("status") REFERENCES "sprint_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD CONSTRAINT "FK_738321a380b6d8e5266516b5302" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD CONSTRAINT "FK_b376aaa2ef5e4724f3508cf5f33" FOREIGN KEY ("work_unit") REFERENCES "sprint_work_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client_status" ADD CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "code_quality_snapshot" ADD CONSTRAINT "FK_03be61d9d46dd39f1f355862e32" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint_snapshot" ADD CONSTRAINT "FK_fb748d58ef594e8505aa9970d98" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint_snapshot_metric" ADD CONSTRAINT "FK_ea96cf0fa988134725f6ad0984b" FOREIGN KEY ("snapshot_id") REFERENCES "sprint_snapshot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint_snapshot_metric" ADD CONSTRAINT "FK_32ee1ecd7212edf6dad1a86ee6a" FOREIGN KEY ("metric_id") REFERENCES "sprint_metric"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_spirit_median" ADD CONSTRAINT "FK_103f28512266352104e3edea624" FOREIGN KEY ("team_name") REFERENCES "team"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_spirit" ADD CONSTRAINT "FK_c258101a9e329fc1cf1ca460195" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "multimedia" ADD CONSTRAINT "FK_2ff4d18f9dd41c4eb24e891d47f" FOREIGN KEY ("multimedia_team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_2d5c878843b5fb237d9633960cb" FOREIGN KEY ("multimedia_album_id") REFERENCES "multimedia"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_links" ADD CONSTRAINT "FK_abb01893e179023bcfcce0e6ea6" FOREIGN KEY ("link_title") REFERENCES "links_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_links" ADD CONSTRAINT "FK_e2facb7b8634882f8a0ee04979f" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "visibility" ADD CONSTRAINT "FK_396c9b89d74447b5dd2e60b9b24" FOREIGN KEY ("visibility_team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_privilege" ADD CONSTRAINT "FK_b5953b98d1159f75a3156d071a9" FOREIGN KEY ("role_id") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_privilege" ADD CONSTRAINT "FK_97a74e8a9913478806bd9258dea" FOREIGN KEY ("privilege_id") REFERENCES "privileges"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
