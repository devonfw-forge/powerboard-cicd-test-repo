import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  showTeamMenu : boolean;
  showGuestMenu : boolean;
  showCurrentTeamMenu : boolean;


showAddTeam : boolean;
showViewAllTeams : boolean;
showAddGuest : boolean;
showViewAllGuests : boolean;
showLogo : boolean;
showMeetingLink : boolean;
showTeamLinks : boolean;
showMultimedia : boolean;
showVideos : boolean;
showSendToTeamSpirit : boolean;
showAddTeamMember : boolean;
showViewAllTeamMembers : boolean;
showEditTeam : boolean;



  constructor() { 
    this.showTeamMenu = false;
    this.showGuestMenu = false;
    this.showCurrentTeamMenu = false;


    this.showAddTeam = false;
    this.showViewAllTeams = false;
    this.showAddGuest = false;
    this.showViewAllGuests = false;
    this.showLogo = false;
    this.showTeamLinks = false;
    this.showMultimedia = false;
    this.showVideos = false;
    this.showSendToTeamSpirit = false;
    this.showAddTeamMember = false;
    this.showViewAllTeamMembers = false;
    this.showEditTeam = false;

  }

  public getShowAddTeamForm():boolean{
    return this.showAddTeam;
  }

  public showAddTeamForm(){
    this.showAddTeam = true;
  }

  public hideAddTeamForm(){
   this.showAddTeam = false;
  }



  public getViewAllTeams():boolean{
    return this.showViewAllTeams;
  }

  public displayViewAllTeams(){
    this.showViewAllTeams = true;
  }

  public hideViewAllTeams(){
   this.showViewAllTeams = false;
  }





  public getShowAddGuest():boolean{
    return this.showAddGuest;
  }

  public showAddGuestForm(){
    this.showAddGuest = true;
  }

  public hideAddGuestForm(){
   this.showAddGuest = false;
  }



  public getViewAllGuests():boolean{
    return this.showViewAllGuests;
  }

  public displayViewAllGuests(){
    this.showViewAllGuests = true;
  }

  public hideViewAllGuests(){
   this.showViewAllGuests = false;
  }


  public getShowLogo():boolean{
    return this.showLogo;
  }

  public ShowLogo(){
    this.showLogo = true;
  }

  public hideLogo(){
    this.showLogo = false;
  }




  public getShowMeetingLink():boolean{
    return this.showMeetingLink;
  }

  public ShowMeetingLink(){
    this.showMeetingLink = true;
  }

  public hideShowMeetingLink(){
    this.showMeetingLink = false;
  }




  public getShowTeamLink():boolean{
    return this.showTeamLinks;
  }

  public ShowTeamLink(){
    this.showTeamLinks = true;
  }

  public hideShowTeamLink(){
    this.showTeamLinks = false;
  }




  public getShowMultimedia():boolean{
    return this.showMultimedia;
  }

  public ShowMultimedia(){
    this.showMultimedia = true;
  }

  public hideShowImage(){
    this.showMultimedia = false;
  }

  public getShowVideo():boolean{
    return  this.showVideos;
  }

  public ShowVideo(){
    this.showVideos = true;
  }

  public hideShowVideo(){
    this.showVideos = false;
  }



  public getShowSendToTeamSpirit():boolean{
    return  this.showSendToTeamSpirit;
  }

  public ShowSendToTeamSpirit(){
    this.showSendToTeamSpirit = true;
  }

  public hideShowSendToTeamSpirit(){
    this.showSendToTeamSpirit = false;
  }



  public getShowAddTeamMember():boolean{
    return   this.showAddTeamMember;
  }

  public ShowAddTeamMember(){
    this.showAddTeamMember = true;
  }

  public hideShowAddTeamMember(){
    this.showAddTeamMember = false;
  }




  public getShowViewTeamMember():boolean{
    return  this.showViewAllTeamMembers;
  }

  public ShowViewTeamMember(){
    this.showViewAllTeamMembers = true;
  }

  public hideShowViewTeamMember(){
    this.showViewAllTeamMembers = false;
  }


  public getShowEditTeam():boolean{
    return  this.showEditTeam;
  }

  public ShowEditTeam(){
    this.showEditTeam = true;
  }

  public hideShowEditTeam(){
    this.showEditTeam = false;
  }


  public hideAll(){
    this.showAddTeam = false;
    this.showViewAllTeams = false;
    this.showAddGuest = false;
    this.showViewAllGuests = false;
    this.showLogo = false;
    this.showMeetingLink = false;
    this.showTeamLinks = false;
    this.showMultimedia = false;
    this.showVideos = false;
    this.showSendToTeamSpirit = false;
    this.showAddTeamMember = false;
    this.showViewAllTeamMembers = false;
    this.showEditTeam = false;
  }

 
}
