import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  template: `
  <aside class="sidebar">
    <!-- <div class="sidebar-wrapper"> -->
    <nav class="navs">
      <!-- <ul> -->
      <ul class="navx">
        <img src="../../../../assets/img/Zethlogo.svg" class="logo mt-2">
        <!-- <h3>ZETH</h3> -->
        <li class="special main mt-4" id="dashboard">
          <!-- <i class="material-icons iconx">space_dashboard</i> -->
          <a class="nav-link hover" href="javascript:void(0)" [routerLink]="['/main/dashboard/overview']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
            <i class="material-icons iconx">space_dashboard</i>
            <span class="sidebar-name"> Dashboard</span>
          </a>
        </li>

        <li class="" id="manage-merchants">
          <a class="nav-links hover cursor" (click)="showDiv = !showDiv">
              <i class="material-icons iconx">business_center </i>
            <!-- <svg class="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.8334 13.3333H9.16675C8.70841 13.3333 8.33341 12.9583 8.33341 12.5H2.50841V15.8333C2.50841 16.75 3.25841 17.5 4.17508 17.5H15.8334C16.7501 17.5 17.5001 16.75 17.5001 15.8333V12.5H11.6667C11.6667 12.9583 11.2917 13.3333 10.8334 13.3333ZM16.6667 5.83333H13.3334C13.3334 3.99167 11.8417 2.5 10.0001 2.5C8.15841 2.5 6.66675 3.99167 6.66675 5.83333H3.33341C2.41675 5.83333 1.66675 6.58333 1.66675 7.5V10C1.66675 10.925 2.40841 11.6667 3.33341 11.6667H8.33341V10.8333C8.33341 10.375 8.70841 10 9.16675 10H10.8334C11.2917 10 11.6667 10.375 11.6667 10.8333V11.6667H16.6667C17.5834 11.6667 18.3334 10.9167 18.3334 10V7.5C18.3334 6.58333 17.5834 5.83333 16.6667 5.83333ZM8.33341 5.83333C8.33341 4.91667 9.08341 4.16667 10.0001 4.16667C10.9167 4.16667 11.6667 4.91667 11.6667 5.83333H8.32508H8.33341Z" fill="#6B6B6B"/>
            </svg> -->
              <span class="sidebar-name"> Merchant </span>
              <i class="material-icons arrows">
                arrow_drop_down
              </i>
          </a>
          <div class="collapsed" id="manageMerchants"  *ngIf="showDiv">
            <ul class="nav">
              <li class="nav-item special-class"  id="create-merchants"
              style="margin-top: -2.5em;">
                <a class="nav-link" href="javascript:void(0)" [routerLink]="['/main/merchant/create-merchant']"  routerLinkActive="active">
                  <!-- <span class="sidebar-mini"> CM </span> -->
                  <span class="sidebar-normal">Create Merchant</span>
                </a>
              </li>
              <li class="nav-item special-class"  id="view-merchants"
              style="margin-top: -3em;  margin-bottom: -15%">
                <a class="nav-link" href="javascript:void(0)" [routerLink]="['/main/merchant/merchant-list']"  routerLinkActive="active">
                  <!-- <span class="sidebar-mini"> AT </span> -->
                  <span class="sidebar-normal">View Merchant</span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li class="main" id="manage-configurations">
          <a class="nav-link hover" href="javascript:void(0)" [routerLink]="['/main/configuration/configuration']" routerLinkActive="active">
            <i class="material-icons iconx">construction</i>
            <!-- <svg class="iconx" width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.6601 12.8644L12.0009 9.2054C11.2791 8.4836 10.201 8.34298 9.33229 8.77107L6.00123 5.44014V3.49971L2.00145 0.5L0.00156239 2.4998L3.0014 6.49941H4.94191L8.27298 9.83034C7.848 10.699 7.98549 11.777 8.70733 12.4988L12.3665 16.1578C12.8227 16.6141 13.5602 16.6141 14.0133 16.1578L15.6601 14.5111C16.1132 14.0549 16.1132 13.3175 15.6601 12.8644ZM10.3666 7.53056C11.2509 7.53056 12.0821 7.87428 12.7071 8.49922L13.3133 9.10541C13.807 8.88981 14.2758 8.58983 14.682 8.18362C15.8413 7.02436 16.235 5.39327 15.8663 3.91217C15.7976 3.63094 15.4445 3.53408 15.2382 3.74031L12.9133 6.06508L10.7916 5.71199L10.4385 3.59032L12.7634 1.26555C12.9696 1.05932 12.8696 0.70623 12.5852 0.634362C11.1041 0.268773 9.47291 0.662484 8.31672 1.81862C7.42615 2.70916 7.00742 3.88404 7.0293 5.05581L9.59478 7.62118C9.84789 7.56181 10.1104 7.53056 10.3666 7.53056ZM7.11992 10.0928L5.34814 8.32111L0.585905 13.0863C-0.195302 13.8674 -0.195302 15.1329 0.585905 15.9141C1.36711 16.6953 2.63267 16.6953 3.41387 15.9141L7.27616 12.052C7.03867 11.4302 6.9668 10.7521 7.11992 10.0928ZM2.00145 15.2486C1.58897 15.2486 1.25149 14.9111 1.25149 14.4986C1.25149 14.083 1.58585 13.7487 2.00145 13.7487C2.41705 13.7487 2.75141 14.083 2.75141 14.4986C2.75141 14.9111 2.41705 15.2486 2.00145 15.2486Z" fill="#6B6B6B"/>
            </svg> -->
           <span class="sidebar-name"> Configurations </span>
          </a>
        </li>
        <!-- <li class="nav-item main" id="manage-integrations">
          <svg class="iconx" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1782 6.16989C15.0815 4.78093 14.6878 2.92268 13.2989 2.01937C11.9099 1.11607 10.0517 1.50976 9.14835 2.89872L6.96757 6.25195C6.06426 7.64091 6.45796 9.49916 7.84691 10.4025C9.23587 11.3058 11.0941 10.9121 11.9974 9.52312L14.1782 6.16989Z" stroke="#6B6B6B" stroke-width="2" stroke-linecap="round"/>
            <path d="M9.23021 10.1093C10.1335 8.72038 9.73982 6.86214 8.35087 5.95883C6.96191 5.05552 5.10366 5.44921 4.20035 6.83817L2.01957 10.1914C1.11626 11.5804 1.50996 13.4386 2.89891 14.3419C4.28787 15.2452 6.14612 14.8515 7.04943 13.4626L9.23021 10.1093Z" stroke="#6B6B6B" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <a class="nav-link hover" href="javascript:void(0)" [routerLink]="['/main/integration/integration']">
            Integration
          </a>
        </li>
        <li class="nav-item main" id="manage-notifications">
          <svg class="iconx" width="20" height="20" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 4.417C15.5 6.02533 14.1917 7.33366 12.5833 7.33366C10.975 7.33366 9.66667 6.02533 9.66667 4.417C9.66667 2.80866 10.975 1.50033 12.5833 1.50033C14.1917 1.50033 15.5 2.80866 15.5 4.417ZM13.8333 8.82533C13.4167 8.93366 13 9.00033 12.5833 9.00033C11.3684 8.99813 10.2039 8.51453 9.34486 7.65547C8.4858 6.79641 8.0022 5.6319 8 4.417C8 3.192 8.48333 2.08366 9.25 1.25866C9.09877 1.07328 8.90808 0.923972 8.69184 0.821617C8.4756 0.719261 8.23924 0.666438 8 0.666997C7.08333 0.666997 6.33333 1.417 6.33333 2.33366V2.57533C3.85833 3.30866 2.16667 5.58366 2.16667 8.167V13.167L0.5 14.8337V15.667H15.5V14.8337L13.8333 13.167V8.82533ZM8 18.167C8.925 18.167 9.66667 17.4253 9.66667 16.5003H6.33333C6.33333 16.9424 6.50893 17.3663 6.82149 17.6788C7.13405 17.9914 7.55797 18.167 8 18.167Z" fill="#6B6B6B"/>
          </svg>
          <a class="nav-link hover" href="javascript:void(0)" [routerLink]="['/main/notification/notification']">
            Notifications
          </a>
        </li> -->
        <li class=" main" id="manage-transactions">
          <a class="nav-link hover" href="javascript:void(0)" [routerLink]="['/main/transaction/transaction']" routerLinkActive="active">
            <i class="material-icons iconx">account_balance_wallet</i>
            <!-- <svg class="" width="20" height="20" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4751 11.4003C16.2751 13.6253 14.6667 15.0837 12.3334 15.0837H4.83342C2.53341 15.0837 0.666748 13.217 0.666748 10.917V5.08366C0.666748 2.81699 2.03341 1.23366 4.15842 0.966992C4.37508 0.933659 4.60008 0.916992 4.83342 0.916992H12.3334C12.5501 0.916992 12.7584 0.925325 12.9584 0.958659C14.9501 1.19199 16.3001 2.58366 16.4751 4.60033C16.4798 4.65739 16.4724 4.71481 16.4535 4.76885C16.4345 4.82288 16.4044 4.87233 16.3651 4.91398C16.3258 4.95563 16.2782 4.98855 16.2254 5.01061C16.1726 5.03266 16.1157 5.04335 16.0584 5.04199H14.7667C13.9667 5.04199 13.2251 5.35033 12.6917 5.90033C12.0584 6.51699 11.7417 7.38366 11.8167 8.25033C11.9501 9.76699 13.2834 10.9587 14.8668 10.9587H16.0584C16.3001 10.9587 16.5001 11.1587 16.4751 11.4003Z" fill="#6B6B6B"/>
              <path d="M17.3334 7.14199V8.85866C17.3334 9.31699 16.9667 9.69199 16.5 9.70866H14.8667C13.9667 9.70866 13.1417 9.05033 13.0667 8.15033C13.0167 7.62533 13.2167 7.13366 13.5667 6.79199C13.875 6.47533 14.3 6.29199 14.7667 6.29199H16.5C16.9667 6.30866 17.3334 6.68366 17.3334 7.14199Z" fill="#6B6B6B"/>
            </svg> -->
            <span class="sidebar-name"> Transactions </span>
          </a>
        </li>
        <li class="main" id="manage-logout">
          <a class="nav-link hover" href="javascript:void(0)" (click)="logOut()">
            <i class="material-icons iconx">logout</i>
            <!-- <svg class="iconx" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.7778 2.22266H3.88894C3.59426 2.22266 3.31164 2.33972 3.10327 2.54809C2.8949 2.75647 2.77783 3.03908 2.77783 3.33377V16.6671C2.77783 16.9618 2.8949 17.2444 3.10327 17.4528C3.31164 17.6611 3.59426 17.7782 3.88894 17.7782H12.7778C13.0725 17.7782 13.3551 17.6611 13.5635 17.4528C13.7719 17.2444 13.889 16.9618 13.889 16.6671V13.3338H8.68339C8.53605 13.3338 8.39474 13.2752 8.29055 13.171C8.18637 13.0669 8.12784 12.9256 8.12784 12.7782C8.12784 12.6309 8.18637 12.4896 8.29055 12.3854C8.39474 12.2812 8.53605 12.2227 8.68339 12.2227H13.889V3.33377C13.889 3.03908 13.7719 2.75647 13.5635 2.54809C13.3551 2.33972 13.0725 2.22266 12.7778 2.22266Z" fill="#6B6B6B"/>
              <path d="M15.6445 9.60038C15.5382 9.50937 15.4015 9.46181 15.2617 9.46721C15.1218 9.47261 14.9892 9.53057 14.8903 9.62952C14.7913 9.72846 14.7334 9.86109 14.728 10.0009C14.7226 10.1407 14.7701 10.2774 14.8611 10.3837L16.7389 12.2226H13.8889V13.3337H16.7389L14.8611 15.2559C14.803 15.3057 14.7557 15.367 14.7224 15.436C14.6891 15.5049 14.6703 15.58 14.6674 15.6565C14.6644 15.733 14.6773 15.8093 14.7052 15.8806C14.7332 15.9519 14.7755 16.0166 14.8297 16.0707C14.8838 16.1249 14.9486 16.1673 15.0198 16.1952C15.0911 16.2231 15.1674 16.236 15.2439 16.2331C15.3205 16.2301 15.3955 16.2114 15.4645 16.178C15.5334 16.1447 15.5947 16.0974 15.6445 16.0393L18.8889 12.8171L15.6445 9.60038Z" fill="#6B6B6B"/>
            </svg> -->
            <span class="sidebar-name"> Sign-out </span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- </div> -->
  </aside>
  `,
  styleUrls: ['../../components/shared.component.css']
})

export class SideBarComponent implements OnInit {
  showDiv: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }


  logOut() {
    sessionStorage.clear();
    localStorage.clear()
    this.router.navigateByUrl('/auth/login');
  }
}
