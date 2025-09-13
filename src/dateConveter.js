// utils/dateConverter.js
import { toJalaali } from 'jalaali-js';

// تابع تبدیل اعداد لاتین به فارسی
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
    // تبدیل رشته به Date
    const date = new Date(isoDate);

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'تاریخ نامعتبر';
    }

    // تبدیل تاریخ میلادی به شمسی
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1; // ماه میلادی از 0 شروع می‌شود
    const gDay = date.getDate();

    const jalaali = toJalaali(gYear, gMonth, gDay);

    // دریافت ساعت و دقیقه (به صورت 24 ساعته)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // تبدیل اعداد به فارسی
    const jalaaliDate = `${jalaali.jy}/${jalaali.jm.toString().padStart(2, '0')}/${jalaali.jd.toString().padStart(2, '0')}`;
    const time = `${hours}:${minutes}`;

    // ترکیب و تبدیل به فارسی
    return `${toPersianDigits(jalaaliDate)} - ${toPersianDigits(time)}`;
};