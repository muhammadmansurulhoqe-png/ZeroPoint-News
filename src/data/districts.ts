export interface Division {
  id: string;
  nameBn: string;
  nameEn: string;
  districts: {
    id: string;
    nameBn: string;
  }[];
}

export const DIVISIONS_AND_DISTRICTS: Division[] = [
  {
    id: 'dhaka',
    nameBn: 'ঢাকা বিভাগ',
    nameEn: 'Dhaka',
    districts: [
      { id: 'dhaka_city', nameBn: 'ঢাকা সদর' },
      { id: 'gazipur', nameBn: 'গাজীপুর' },
      { id: 'narayanganj', nameBn: 'নারায়ণগঞ্জ' },
      { id: 'tangail', nameBn: 'টাঙ্গাইল' },
      { id: 'faridpur', nameBn: 'ফরিদপুর' },
      { id: 'narsingdi', nameBn: 'নরসিংদী' },
      { id: 'manikganj', nameBn: 'মানিকগঞ্জ' },
      { id: 'munshiganj', nameBn: 'মুন্সীগঞ্জ' },
      { id: 'kishoreganj', nameBn: 'কিশোরগঞ্জ' },
      { id: 'gopalganj', nameBn: 'গোপালগঞ্জ' },
      { id: 'madaripur', nameBn: 'মাদারীপুর' },
      { id: 'rajbari', nameBn: 'রাজবাড়ী' },
      { id: 'shariatpur', nameBn: 'শরীয়তপুর' },
    ],
  },
  {
    id: 'chattogram',
    nameBn: 'চট্টগ্রাম বিভাগ',
    nameEn: 'Chattogram',
    districts: [
      { id: 'chattogram_city', nameBn: 'চট্টগ্রাম সদর' },
      { id: 'coxsbazar', nameBn: 'কক্সবাজার' },
      { id: 'cumilla', nameBn: 'কুমিল্লা' },
      { id: 'feni', nameBn: 'ফেনী' },
      { id: 'brahmanbaria', nameBn: 'ব্রাহ্মণবাড়িয়া' },
      { id: 'noakhali', nameBn: 'নোয়াখালী' },
      { id: 'chandpur', nameBn: 'চাঁদপুর' },
      { id: 'lakshmipur', nameBn: 'লক্ষ্মীপুর' },
      { id: 'rangamati', nameBn: 'রাঙ্গামাটি' },
      { id: 'khagrachhari', nameBn: 'খাগড়াছড়ি' },
      { id: 'bandarban', nameBn: 'বান্দরবান' },
    ],
  },
  {
    id: 'rajshahi',
    nameBn: 'রাজশাহী বিভাগ',
    nameEn: 'Rajshahi',
    districts: [
      { id: 'rajshahi_city', nameBn: 'রাজশাহী সদর' },
      { id: 'bogra', nameBn: 'বগুড়া' },
      { id: 'pabna', nameBn: 'পাবনা' },
      { id: 'sirajganj', nameBn: 'সিরাজগঞ্জ' },
      { id: 'naogaon', nameBn: 'নওগাঁ' },
      { id: 'natore', nameBn: 'নাটোর' },
      { id: 'chapainawabganj', nameBn: 'চাঁপাইনবাবগঞ্জ' },
      { id: 'joypurhat', nameBn: 'জয়পুরহাট' },
    ],
  },
  {
    id: 'sylhet',
    nameBn: 'সিলেট বিভাগ',
    nameEn: 'Sylhet',
    districts: [
      { id: 'sylhet_city', nameBn: 'সিলেট সদর' },
      { id: 'moulvibazar', nameBn: 'মৌলভীবাজার' },
      { id: 'habiganj', nameBn: 'হবিগঞ্জ' },
      { id: 'sunamganj', nameBn: 'সুনামগঞ্জ' },
    ],
  },
  {
    id: 'khulna',
    nameBn: 'খুলনা বিভাগ',
    nameEn: 'Khulna',
    districts: [
      { id: 'khulna_city', nameBn: 'খুলনা সদর' },
      { id: 'jessore', nameBn: 'যশোর' },
      { id: 'satkhira', nameBn: 'সাতক্ষীরা' },
      { id: 'bagerhat', nameBn: 'বাগেরহাট' },
      { id: 'kushtia', nameBn: 'কুষ্টিয়া' },
      { id: 'jhenaidah', nameBn: 'ঝিনাইদহ' },
      { id: 'chuadanga', nameBn: 'চুয়াডাঙ্গা' },
      { id: 'magura', nameBn: 'মাগুরা' },
      { id: 'meherpur', nameBn: 'মেহেরপুর' },
      { id: 'narail', nameBn: 'নড়াইল' },
    ],
  },
  {
    id: 'barishal',
    nameBn: 'বরিশাল বিভাগ',
    nameEn: 'Barishal',
    districts: [
      { id: 'barishal_city', nameBn: 'বরিশাল সদর' },
      { id: 'patuakhali', nameBn: 'পটুয়াখালী' },
      { id: 'bhola', nameBn: 'ভোলা' },
      { id: 'pirojpur', nameBn: 'পিরোজপুর' },
      { id: 'barguna', nameBn: 'বরগুনা' },
      { id: 'jhalokati', nameBn: 'ঝালকাঠি' },
    ],
  },
  {
    id: 'rangpur',
    nameBn: 'রংপুর বিভাগ',
    nameEn: 'Rangpur',
    districts: [
      { id: 'rangpur_city', nameBn: 'রংপুর সদর' },
      { id: 'dinajpur', nameBn: 'দিনাজপুর' },
      { id: 'gaibandha', nameBn: 'গাইবান্ধা' },
      { id: 'kurigram', nameBn: 'কুড়িগ্রাম' },
      { id: 'lalmonirhat', nameBn: 'লালমনিরহাট' },
      { id: 'nilphamari', nameBn: 'নীলফামারী' },
      { id: 'panchagarh', nameBn: 'পঞ্চগড়' },
      { id: 'thakurgaon', nameBn: 'ঠাকুরগাঁও' },
    ],
  },
  {
    id: 'mymensingh',
    nameBn: 'ময়মনসিংহ বিভাগ',
    nameEn: 'Mymensingh',
    districts: [
      { id: 'mymensingh_city', nameBn: 'ময়মনসিংহ সদর' },
      { id: 'jamalpur', nameBn: 'জামালপুর' },
      { id: 'netrokona', nameBn: 'নেত্রকোণা' },
      { id: 'sherpur', nameBn: 'শেরপুর' },
    ],
  },
];
