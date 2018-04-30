import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms/src/model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      valuation: this.fb.group({
        value: this.fb.control(150000),
        downPayment: this.fb.control(33000),
        downPaymentPercentage: this.fb.control(this.getPercentage(150000, 33000)),
        rent: this.fb.control(1250)
      }),
      maintenance: this.fb.group({
        mortgage: this.fb.control(580),
        hoa: this.fb.control(0),
        tax: this.fb.control(100),
        insurance: this.fb.control(60),
        maintenance: this.fb.control(100),
        maintenancePercentage: this.fb.control(this.getPercentage(1250, 100)),
        management: this.fb.control(125),
        managementPercentage: this.fb.control(this.getPercentage(1250, 125)),
        capitalExpense: this.fb.control(0)
      })
    });
  }

  // get-set properties
  get propertyValue(): number {
    const control = this.fgValuation.get("value") as FormGroup;
    return control ? control.value : 0;
  }

  set propertyValue(val: number) {
    this.fcDownPayment.setValue(val);
  }

  get downPayment(): number {
    const control = this.fcDownPayment;
    return control ? control.value : 0;
  }

  set downPayment(val: number) {
    this.fcDownPayment.setValue(val);
  }

  get downPaymentPercentage(): number {
    const control = this.fcDownPaymentPercentage;
    return control ? control.value : 0;
  }

  set downPaymentPercentage(val: number) {
    this.fcDownPaymentPercentage.setValue(val);
  }

  get maintenance(): number {
    const control = this.fcMaintenance;
    return control ? control.value : 0;
  }

  set maintenance(val: number) {
    this.fcMaintenance.setValue(val);
  }

  get maintenancePercentage(): number {
    const control = this.fcMaintenancePercentage;
    return control ? control.value : 0;
  }

  set maintenancePercentage(val: number) {
    this.fcMaintenancePercentage.setValue(val);
  }

  get management(): number {
    const control = this.fcManagement;
    return control ? control.value : 0;
  }

  set management(val: number) {
    this.fcManagement.setValue(val);
  }

  get managementPercentage(): number {
    const control = this.fcManagementPercentage;
    return control ? control.value : 0;
  }

  set managementPercentage(val: number) {
    this.fcManagementPercentage.setValue(val);
  }

  // get-only properties
  get fgValuation(): FormGroup {
    return this.form.get("valuation") as FormGroup;
  }

  get fgMaintenance(): FormGroup {
    return this.form.get("maintenance") as FormGroup;
  }

  get fcValue(): FormControl {
    return this.fgValuation.get("value") as FormControl;
  }

  get fcDownPayment(): FormControl {
    return this.fgValuation.get("downPayment") as FormControl;
  }

  get fcDownPaymentPercentage(): FormControl {
    return this.fgValuation.get("downPaymentPercentage") as FormControl;
  }

  get fcRent(): FormControl {
    return this.fgValuation.get("rent") as FormControl;
  }

  get fcMortgage(): FormControl {
    return this.fgMaintenance.get("mortgage") as FormControl;
  }

  get fcTax(): FormControl {
    return this.fgMaintenance.get("tax") as FormControl;
  }

  get fcInsurance(): FormControl {
    return this.fgMaintenance.get("insurance") as FormControl;
  }

  get fcHoa(): FormControl {
    return this.fgMaintenance.get("hoa") as FormControl;
  }

  get fcCapitalExpense(): FormControl {
    return this.fgMaintenance.get("capitalExpense") as FormControl;
  }

  get fcMaintenance(): FormControl {
    return this.fgMaintenance.get("maintenance") as FormControl;
  }

  get fcMaintenancePercentage(): FormControl {
    return this.fgMaintenance.get("maintenancePercentage") as FormControl;
  }

  get fcManagement(): FormControl {
    return this.fgMaintenance.get("management") as FormControl;
  }

  get fcManagementPercentage(): FormControl {
    return this.fgMaintenance.get("managementPercentage") as FormControl;
  }

  get rent(): number {
    const control = this.fcRent;
    return control ? control.value : 0;
  }

  get mortgage(): number {
    const control = this.fcMortgage;
    return control ? control.value : 0;
  }

  get insurance(): number {
    const control = this.fcInsurance;
    return control ? control.value : 0;
  }

  get tax(): number {
    const control = this.fcTax;
    return control ? control.value : 0;
  }

  get hoa(): number {
    const control = this.fcHoa;
    return control ? control.value : 0;
  }

  get capitalExpense(): number {
    const control = this.fcCapitalExpense;
    return control ? control.value : 0;
  }

  get operatingExpense(): number {
    return this.mortgage +
      this.tax +
      this.insurance +
      this.maintenance +
      this.management +
      this.hoa +
      this.capitalExpense;
  }

  get operatingExpensePercentage(): number {
    return this.getPercentage(this.rent, this.operatingExpense) / 100;
  }

  get operatingNetMonthly(): number {
    return this.rent - this.operatingExpense;
  }

  get operatingNetAnnual(): number {
    return this.operatingNetMonthly * 12;
  }

  get maintenanceAnnual(): number {
    return this.maintenance * 12;
  }

  get cashOnCash(): number {
    //return 100 * ((vm.expectedRent - getOperatingExpense()) * 12) / vm.downPayment;
    return ((this.rent - this.operatingExpense) * 12) / this.downPayment;
  }

  get yearsToRecover(): number {
    return this.downPayment / this.operatingNetAnnual;
  }

  recalculate(): void {
    this.updateDownPaymentFromPercentage();
    this.updateMaintenanceFromPercentage();
    this.updateManagementFromPercentage();
  }

  updateDownPaymentFromPercentage() {
    this.downPayment = this.getDownPaymentFromPercentage();
  }

  updateDownPaymentPercentage() {
    this.downPaymentPercentage = this.getDownPaymentPercentage();
  }

  updateMaintenanceFromPercentage() {
    this.maintenance = this.getMaintenanceFromPercentage();
  }

  updateMaintenancePercentage() {
    this.maintenancePercentage = this.getPercentage(this.rent, this.maintenance);
  }

  updateManagementFromPercentage() {
    this.management = this.getManagementFromPercentage();
  }

  updateManagementPercentage() {
    this.managementPercentage = this.getPercentage(this.rent, this.management);
  }

  // internal methods
  private getDownPaymentPercentage() {
    return this.getPercentage(this.propertyValue, this.downPayment);
  }

  private getDownPaymentFromPercentage() {
    return this.getValueFromPercentage(this.propertyValue, this.downPaymentPercentage);
  }

  private getMaintenanceFromPercentage() {
    return this.getValueFromPercentage(this.rent, this.maintenancePercentage);
  }

  private getManagementFromPercentage() {
    return this.getValueFromPercentage(this.rent, this.managementPercentage);
  }

  private getValueFromPercentage(base: number, percentage: number): number {
    return (base * percentage) / 100;
  }

  private getPercentage(whole: number, portion: number): number {
    return (portion / whole) * 100;
  }
}
