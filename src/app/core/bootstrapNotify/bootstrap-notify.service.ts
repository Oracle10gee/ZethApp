/* tslint:disable */
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-notify';

@Injectable({
  providedIn: 'root'
})
export class BootstrapNotifyService {
  // hasAlertOpened = false;
  private options: any = {
    type: null,
    // mouse_over: 'pause',
    delay: 5000,
    z_index: 999999999999999999,
    showProgressbar: true,
    allow_dismiss: true,
    placement: {align: 'center'}
  };


  constructor() {
  }
   private close() {
  // notify.close();
  }
  public custom(type = 'danger', title = 'Notification', msg: any) {
    const notify = $.notify({ message: '' }, this.options);
    notify.update('type', type);
    notify.update('title', `&nbsp;&nbsp;<strong >${title}</strong>`);
    notify.update('message', `<p>&nbsp;${msg}</p>`);
    notify.close();
  }

  public success(msg: string, position = 'right') {
    /*this.options.placement.align = position;
    const notify = $.notify({ message: '' }, this.options);
    notify.update('type', 'success');
    notify.update('title', '&nbsp;&nbsp;<strong style="">Success</strong>');
    notify.update('message', `<p>&nbsp;${msg}</p>`);
    notify.update('icon', 'fa fa-check');*/
    $('div.notification').remove();
    $.notify({
    title: 'Success!!',
      message: msg
    },{
      type: 'pastel-success',
      delay: 5000,
      template: '<div data-notify="container" class="col-xs-11 notification col-sm-3 alert alert-{0} message-block" role="alert">' +
      '<span data-notify="title" class="error-message">{1}</span>' +
      '<span data-notify="message" class="error-message">{2}</span>' + '<button type="button" aria-hidden="true" class="close"' +
      ' data-notify="dismiss" style="margin-top: 0; font-size:1.5rem; padding: 0 4px 4px 5px">&times;</button>'
      + '</div>'
    });
  }

  public specialSuccess(msg: string, position = 'right') {
    /*this.options.placement.align = position;
    const notify = $.notify({ message: '' }, this.options);
    notify.update('type', 'success');
    notify.update('title', '&nbsp;&nbsp;<strong style="">Success</strong>');
    notify.update('message', `<p>&nbsp;${msg}</p>`);
    notify.update('icon', 'fa fa-check');*/
    $('div.notification').remove();
    $.notify({
      title: 'Success!',
      message: msg
    },{
      type: 'pastel-success',
      delay: 5000,
      template: '<div data-notify="container" class="col-xs-11 notification col-sm-3 alert alert-{0} message-block" role="alert">' +
      '<span data-notify="title" class="error-message">{1}</span>' +
      '<span data-notify="message" class="error-message">{2}</span>' + '<button type="button" aria-hidden="true" class="close"' +
      ' data-notify="dismiss" style="margin-top: 0; font-size:1.5rem; padding: 0 4px 4px 5px">&times;</button>'
      + '</div>'
    });
  }

  public error(msg: string, position = 'right') {
    /*this.options.placement.align = position;
    const notify = $.notify({ message: '' }, this.options);
    notify.update('type', 'danger');
    notify.update('title', '&nbsp;&nbsp;<strong style="">Error</strong>');
    notify.update('message', `<p>&nbsp;${msg}</p>`);
    notify.update('icon', 'fa fa-warning');*/
    $('div.notification').remove();
    $.notify({
      title: 'Error!',
      message: msg
    },{
      type: 'pastel-danger',
      delay: 5999000,
      template:
      '<div data-notify="container" class="col-xs-11 notification col-sm-3 alert alert-{0} message-block" role="alert">' +
      '<span data-notify="title" class="error-message">{1}</span>' +
      '<span data-notify="message" style="margin-top: 5px;" class="error-message">{2}</span>' +
      '<button type="button" aria-hidden="true" class="close"' +
      ' data-notify="dismiss" style="margin-top: 0; font-size:1.5rem; padding: 0 4px 4px 5px">&times;</button>' +
      '</div>'
    });
  }

  public info(msg: string, position = 'right') {
    /*this.options.placement.align = position;
    const notify = $.notify({ message: '' }, this.options);
    notify.update('type', 'info');
    notify.update('title', '&nbsp;&nbsp;<strong style="">Info</strong>');
    notify.update('message', `<p>&nbsp;${msg}</p>`);
    notify.update('icon', 'fa fa-info');*/
    $('div.notification').remove();

    $.notify({
      title: 'Info!',
      message: msg
    },{
      type: 'pastel-info',
      delay: 5000,
      template: '<div data-notify="container" class="col-xs-11 notification col-sm-3 alert alert-{0} message-block" role="alert">' +
      '<span data-notify="title" class="error-message">{1}</span>' +
      '<span data-notify="message" class="error-message">{2}</span>' + '<button type="button" aria-hidden="true" class="close"' +
      ' data-notify="dismiss" style="margin-top: 0; font-size:2rem; padding: 0 4px 4px 5px">&times;</button>' +
      '</div>'
    });
  }

  public specialInfo(msg: string, position = 'right') {
    /*this.options.placement.align = position;
    const notify = $.notify({ message: '' }, this.options);
    notify.update('type', 'info');
    notify.update('title', '&nbsp;&nbsp;<strong style="">Info</strong>');
    notify.update('message', `<p>&nbsp;${msg}</p>`);
    notify.update('icon', 'fa fa-info');*/
    $('div.notification').remove();
    $.notify({
      title: 'Info!',
      message: msg
    },{
      type: 'pastel-info',
      delay: 5000,
      template: '<div data-notify="container" class="col-xs-11 notification col-sm-3 alert alert-{0} message-block" role="alert">' +
      '<span data-notify="title" class="error-message">{1}</span>' +
      '<span data-notify="message" class="error-message">{2}</span>' + '<button type="button" aria-hidden="true" class="close"' +
      ' data-notify="dismiss" style="margin-top: 0; font-size:2rem; padding: 0 4px 4px 5px">&times;</button>' +
      '</div>',
    });
    // this.hasAlertOpened = true;
  }

  public warning(msg: string, position = 'right') {
    /*this.options.placement.align = position;
    const notify = $.notify({ message: '' }, this.options);
    notify.update('type', 'warning');
    notify.update('title', '&nbsp;&nbsp;<strong style="">Warning</strong>');
    notify.update('message', `<p>&nbsp;${msg}</p>`);
    notify.update('icon', 'fa fa-warning');

*/
    $('div.notification').remove();
    $.notify({
      title: 'Warning!',
      message: msg
    },{
      type: 'pastel-warning',
      delay: 5000,
      template: '<div data-notify="container" class="col-xs-11 notification col-sm-3 alert alert-{0} message-block" role="alert">' +
      '<span data-notify="title" class="error-message">{1}</span>' +
      '<span data-notify="message" class="error-message">{2}</span>' + '<button type="button" aria-hidden="true" class="close"' +
      ' data-notify="dismiss" style="margin-top: 0; font-size:2rem; padding: 0 4px 4px 5px">&times;</button>' +
      '</div>'
    });
  }
}
