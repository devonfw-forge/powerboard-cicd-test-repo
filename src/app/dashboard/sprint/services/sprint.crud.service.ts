import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BurndownResponse } from '../model/dto/BurndownResponse';
import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';
import { VelocityComparisonResponse } from '../model/dto/VelocityComparisonResponse';
import { Sprint } from '../model/entities/sprint.entity';
import { SprintSnapshot } from '../model/entities/sprintSnapshot.entity';
import { SprintSnapshotMetric } from '../model/entities/sprintSnapshotMetric.entity';
import { SprintMetric } from '../model/entities/sprint_metric.entity';
import { SprintStatus } from '../model/entities/sprint_status.entity';
import { SprintWorkUnit } from '../model/entities/sprint_work_unit.entity';
import { ISprintCrudService } from './sprint.crud.service.interface';

@Injectable()
export class SprintCrudService extends TypeOrmCrudService<Sprint> implements ISprintCrudService {
  constructor(@InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {
    super(sprintRepository);
  }

  /**
   * getSprintDetailResponse method will fetch the current sprint details
   * @param {teamId} ,Takes teamId as input
   * @return {SprintDetailResponse} SprintDetail as response
   */
  async getSprintDetailResponse(teamId: string): Promise<SprintDetailResponse | undefined> {
    let sprintDetailResponse: SprintDetailResponse = {} as SprintDetailResponse;

    const sprintDetail = await this.sprintRepository
      .createQueryBuilder('sprint')
      .addSelect('sprint.id', 'sprint_id')
      .addSelect('st.status', 'st_status')
      .addSelect('ss.id', 'ss_id')
      .addSelect('smt.name', 'smt_name')
      .addSelect('ssm.value', 'ssm_value')
      .addSelect('ss.date_time', 'ss_date_time')
      .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
      .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
      .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
      .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
      .where('sprint.team_id =:team_Id', { team_Id: teamId })
      .andWhere('sprint.status=:status', { status: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
      .orderBy('ss.date_time', 'DESC')
      .limit(2)
      .getRawMany();

    console.log('sprint detail response ***************************************');
    console.log(sprintDetail);
    if (sprintDetail[0] == null) {
      return undefined;
    } else {
      var end_date = new Date(sprintDetail[0].sprint_end_date);
      var start_date = new Date(sprintDetail[0].sprint_start_date);
      var currentDate = new Date();
      const diff1 = Math.abs(currentDate.getTime() - start_date.getTime());
      const diff2 = Math.abs(end_date.getTime() - start_date.getTime());
      const Sprint_current_day = Math.ceil(diff1 / (1000 * 60 * 60 * 24));
      const Sprint_days = Math.ceil(diff2 / (1000 * 60 * 60 * 24));
      sprintDetailResponse.Sprint_current_day = Sprint_current_day;
      sprintDetailResponse.sprint_number = sprintDetail[0].sprint_sprint_number;
      sprintDetailResponse.Sprint_days = Sprint_days;
      return sprintDetailResponse;
    }
  }
  burndownResponse: BurndownResponse = {} as BurndownResponse;
  /**
   * getBurndown method will retrieve the burndown report of current sprint
   * @param {teamId} teamId Takes teamId as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint
   */
  async getBurndown(teamId: string): Promise<BurndownResponse | undefined> {
    let output: BurndownResponse = {} as BurndownResponse;

    const sprintForBurndown = await this.sprintRepository
      .createQueryBuilder('sprint')
      .addSelect('sprint.id', 'sprint_id')
      .addSelect('st.status', 'st_status')
      .addSelect('ss.id', 'ss_id')
      .addSelect('smt.name', 'smt_name')
      .addSelect('ssm.value', 'ssm_value')
      .addSelect('ss.date_time', 'ss_date_time')
      .addSelect('sw.work_unit', 'sw_work_unit')
      .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
      .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
      .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
      .innerJoin(SprintWorkUnit, 'sw', 'sw.id=sprint.work_unit')
      .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
      .where('sprint.team_id =:team_Id', { team_Id: teamId })
      .andWhere('sprint.status=:status', { status: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
      .orderBy('ss.date_time', 'DESC')
      .limit(2)
      .getRawMany();

    console.log('Get Burndown ***************************');
    console.log(sprintForBurndown);
    if (sprintForBurndown[0] == null) {
      return undefined;
    } else {
      const start_date = new Date(sprintForBurndown[0].sprint_start_date);
      const end_date = new Date(sprintForBurndown[0].sprint_end_date);
      const diff = Math.abs(new Date().getTime() - start_date.getTime());
      const diff1 = Math.abs(end_date.getTime() - start_date.getTime());
      const currentDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const totalDays = Math.ceil(diff1 / (1000 * 60 * 60 * 24));
      console.log(start_date + '  ' + end_date);
      console.log(currentDay + '  ' + totalDays);
      const excludeDays = (totalDays / 7) * 2;
      const businessDays = totalDays - excludeDays;
      if (sprintForBurndown[0].smt_name == 'Work Committed') {
        return this.calculateBurnDownFirstCase(sprintForBurndown, businessDays, currentDay);
      } else if (sprintForBurndown[0].smt_name == 'Work Completed') {
        return this.calculateBurnDownSecondCase(sprintForBurndown, businessDays, currentDay);
      } else {
        console.log('work spillover');
      }
      return output;
    }
  }

  /**
   * calculateBurndownFirstCase method will retrieve the burndown report of current sprint if at 0 index , there is 'Work Committed'
   * @param {result, totalDays, currentDay} .Takes these parameter as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint
   */
  calculateBurnDownFirstCase(sprintForBurndown: any, totalDays: number, currentDay: number): BurndownResponse {
    if (Number(sprintForBurndown[0].ssm_value) > Number(sprintForBurndown[1].ssm_value)) {
      this.burndownResponse.workUnit = sprintForBurndown[0].sw_work_unit;
      this.burndownResponse.remainingDays = totalDays - currentDay;
      console.log(this.burndownResponse.remainingDays);
      this.burndownResponse.remainingWork = sprintForBurndown[0].ssm_value - sprintForBurndown[1].ssm_value;
      const ideal = Math.round((sprintForBurndown[0].ssm_value / totalDays) * currentDay);
      const actual = sprintForBurndown[1].ssm_value;
      this.burndownResponse = this.getBurndownStatus(ideal, actual);
    }
    return this.burndownResponse;
  }

  /**
   * calculateBurndownSecondCase method will retrieve the burndown report of current sprint if at 0 index , there is 'Work Completed'
   * @param {result, totalDays, currentDay} .Takes these parameter as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint
   */
  calculateBurnDownSecondCase(sprintForBurndown: any, totalDays: number, currentDay: number): BurndownResponse {
    if (Number(sprintForBurndown[0].ssm_value) < Number(sprintForBurndown[1].ssm_value)) {
      this.burndownResponse.workUnit = sprintForBurndown[0].sw_work_unit;
      this.burndownResponse.remainingDays = totalDays - currentDay;
      console.log(this.burndownResponse.remainingDays);
      this.burndownResponse.remainingWork = sprintForBurndown[1].ssm_value - sprintForBurndown[0].ssm_value;
      const ideal = Math.round((sprintForBurndown[1].ssm_value / totalDays) * currentDay);
      const actual = sprintForBurndown[0].ssm_value;
      this.burndownResponse = this.getBurndownStatus(ideal, actual);
    }

    return this.burndownResponse;
  }

  /**
   * getBurndownStatus method will fetch the status
   * @param {ideal, actual} .Takes Ideal and actual rate as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint status
   */
  getBurndownStatus(ideal: number, actual: number): BurndownResponse {
    if (ideal > actual) {
      this.burndownResponse.count = ideal - actual;
      this.burndownResponse.burndownStatus = 'Behind Time';
    } else if (ideal == actual) {
      this.burndownResponse.burndownStatus = 'On Time';
    } else {
      this.burndownResponse.count = actual - ideal;
      this.burndownResponse.burndownStatus = 'Ahead Time';
    }
    return this.burndownResponse;
  }

  velocityComparisonResponse = {} as VelocityComparisonResponse;
  /**
   * getVelocityComparison method will retrieve the velocity report of current sprint
   * @param {teamId} teamId Takes teamId as input
   * @return {VelocityComparisonResponse} VelocityComparison as response for that team's current sprint
   */
  async getVelocityComparison(teamId: string): Promise<VelocityComparisonResponse | undefined> {
    const sprintMetricsResponse = await this.sprintRepository
      .createQueryBuilder('sprint')
      .addSelect('sprint.id', 'sprint_id')
      .addSelect('st.status', 'st_status')
      .addSelect('ss.id', 'ss_id')
      .addSelect('smt.name', 'smt_name')
      .addSelect('ssm.value', 'ssm_value')
      .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
      .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
      .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
      .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
      .where('sprint.team_id =:team_Id', { team_Id: teamId })
      .andWhere('sprint.status=:status', { status: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
      .orderBy('ss.date_time', 'DESC')
      .limit(2)
      .getRawMany();

    console.log('Get Velocity Comparison ****************************************');
    console.log(sprintMetricsResponse);
    if (sprintMetricsResponse == null) {
      return undefined;
    } else {
      const previousSprintCompleted = await this.sprintRepository
        .createQueryBuilder('sprint')
        .addSelect('sprint.id', 'sprint_id')
        .addSelect('st.status', 'st_status')
        .addSelect('ss.id', 'ss_id')
        .addSelect('smt.name', 'smt_name')
        .addSelect('ssm.value', 'ssm_value')
        .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
        .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
        .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
        .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
        .where('sprint.team_id =:team_Id', { team_Id: teamId })
        .andWhere('sprint.status=:status', { status: '11155bf3-ada5-495c-8019-8d7ab76d488e' })
        .andWhere('ssm.metric_id=:metric_id', { metric_id: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
        .orderBy('sprint.id')
        .getRawMany();
      console.log('Previous sprint completed ***********************');
      console.log(previousSprintCompleted);
      if (previousSprintCompleted.length == 0 || previousSprintCompleted == null) {
        console.log('ho gya');
        return undefined;
      } else {
        this.velocityComparisonResponse.Avg = this.getAverageVelocity(previousSprintCompleted);
        this.velocityComparisonResponse = this.getVelocityData(sprintMetricsResponse);
        return this.velocityComparisonResponse;
      }
    }
  }

  /**
   * getAverageVelocity method will calculate the average velocity
   * @param {previousSprintCompleted} previousSprintCompleted Takes these parameters as input
   * @return {VelocityComparisonResponse} Average velocity as response
   */
  getAverageVelocity(previousSprintCompleted: any): number {
    let sum = 0;
    for (let i = 0; i < previousSprintCompleted.length; i++) {
      sum = sum + Number(previousSprintCompleted[i].ssm_value);
    }
    let avg = sum / previousSprintCompleted.length;
    return avg;
  }

  /**
   * getVelocityData method will fetch current sprints data
   * @param {sprintMetricResponse} sprintMetricsResponse Takes as input
   * @return {VelocityComparisonResponse} current sprint committed and completed as response
   */
  getVelocityData(sprintMetricsResponse: any): VelocityComparisonResponse {
    if (sprintMetricsResponse[0].smt_name == 'Work Committed') {
      this.velocityComparisonResponse.Committed = Number(sprintMetricsResponse[0].ssm_value);
      this.velocityComparisonResponse.Completed = Number(sprintMetricsResponse[1].ssm_value);
    } else if (sprintMetricsResponse[1].smt_name == 'Work Committed') {
      this.velocityComparisonResponse.Committed = Number(sprintMetricsResponse[1].ssm_value);
      this.velocityComparisonResponse.Committed = Number(sprintMetricsResponse[0].ssm_value);
    }
    return this.velocityComparisonResponse;
  }

  // sprintWorkUnitResponse: SprintWorkUnitResponse = {} as SprintWorkUnitResponse;

  // async sprintWorkUnit(teamId: string): Promise<SprintWorkUnitResponse | undefined> {

  //   console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
  //   const sprintForBurndown = await this.getBurndown(teamId) as BurndownResponse | undefined;
  //   this.sprintWorkUnitResponse.workUnit = sprintForBurndown!.workUnit;
  //   return this.sprintWorkUnitResponse;
  // }
  //spirint Service check
}
