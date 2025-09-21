import { toJalaali } from 'jalaali-js';

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export const toPersianDigits = (str) => {
    return str.replace(/\d/g, (match) => persianDigits[parseInt(match)]);
};

/**
 * تبدیل تاریخ و زمان میلادی (ISO string) به شمسی با ساعت و دقیقه
 * @param {string} isoDate - تاریخ میلادی به صورت ISO (مثلاً "2024-07-15T14:30:00Z")
 * @returns {string} فرمت شمسی با ساعت: "۱۴۰۳/۰۴/۲۵ - ۱۴:۳۰"
 */
export const convertToJalaali = (isoDate) => {
    const date = new Date(isoDate);

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'تاریخ نامعتبر';
    }

    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1;
    const gDay = date.getDate();

    const jalaali = toJalaali(gYear, gMonth, gDay);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const jalaaliDate = `${jalaali.jy}/${jalaali.jm.toString().padStart(2, '0')}/${jalaali.jd.toString().padStart(2, '0')}`;
    const time = `${hours}:${minutes}`;

    return `${toPersianDigits(jalaaliDate)} - ${toPersianDigits(time)}`;
};