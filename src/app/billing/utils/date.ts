
export class MyDate{

  static formatDateShort(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  static formatDateLong(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  static convertToCustomDate(dateArray: number[] | Date | null): Date {
    if (dateArray === null) {
      return new Date(2000, 0, 1);
    }
    if (dateArray instanceof Date) {
      return dateArray
    }
    const year = dateArray[0];
    const month = dateArray[1] - 1; // Los meses en JavaScript son base 0 (enero es 0)
    const day = dateArray[2];
    const hours = dateArray[3];
    const minutes = dateArray[4];
    const seconds = dateArray[5];
    const milliseconds = dateArray[6];

    return new Date(year, month, day, hours, minutes, seconds, milliseconds);
  }

  static convertToCustomDateShort(dateArray: number[] | Date | null): Date {
    if (dateArray === null) {
      return new Date(2000, 0, 1);
    }
    if (dateArray instanceof Date) {
      return dateArray
    }
    const year = dateArray[0];
    const month = dateArray[1] - 1; // Los meses en JavaScript son base 0 (enero es 0)
    const day = dateArray[2];

    return new Date(year, month, day);
  }

  static convertToCustomStringShort(dateArray: number[] | Date | null): string {
    if (dateArray === null) {
      return '01/01/2000'; // Fecha por defecto: 1 de enero de 2000
    }

    if (dateArray instanceof Date) {
      return this.formatDateShort(dateArray);
    }

    const year = dateArray[0];
    const month = dateArray[1] - 1; // Los meses en JavaScript son base 0 (enero es 0)
    const day = dateArray[2];

    const customDate = new Date(year, month, day);
    return this.formatDateShort(customDate);
  }

  static convertToCustomStringLong(dateArray: number[] | Date | null): string {
    if (dateArray === null) {
      return '01/01/2000 00:00:00'; // Fecha por defecto: 1 de enero de 2000 a las 00:00:00
    }

    if (dateArray instanceof Date) {
      return this.formatDateLong(dateArray);
    }

    const year = dateArray[0];
    const month = dateArray[1] - 1; // Los meses en JavaScript son base 0 (enero es 0)
    const day = dateArray[2];
    const hour = dateArray[3] || 0;
    const minute = dateArray[4] || 0;
    const second = dateArray[5] || 0;

    const customDate = new Date(year, month, day, hour, minute, second);
    return this.formatDateLong(customDate);
  }

}
