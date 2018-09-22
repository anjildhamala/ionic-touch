export class TouchError {
  status: number;
  value: string;

  constructor(error: { status: number, value: string }) {
    this.status = error.status;
    this.value = error.value;
  }
}