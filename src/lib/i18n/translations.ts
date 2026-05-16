export const LANGS = ["uz", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_META: Record<Lang, { label: string; flag: string }> = {
  uz: { label: "Uz", flag: "🇺🇿" },
  ru: { label: "Ru", flag: "🇷🇺" },
  en: { label: "En", flag: "🇬🇧" },
};

type Dict = {
  brand: string;
  nav: {
    dashboard: string;
    cargo: string;
    myCargo: string;
    offers: string;
    trips: string;
    driverManagers: string;
    gps: string;
    role: string;
  };
  breadcrumbHome: string;
  pageTitle: string;
  searchPlaceholder: string;
  found: (n: number) => string;
  filters: {
    fromCity: string;
    fromCityPh: string;
    toCity: string;
    toCityPh: string;
    transport: string;
    transportPh: string;
    weight: string;
    min: string;
    max: string;
    date: string;
    dateStart: string;
    dateEnd: string;
    favorite: string;
    status: string;
    statusSearching: string;
    statusCompleted: string;
    sort: string;
    sortNewest: string;
    sortOldest: string;
    reset: string;
    all: string;
  };
  table: {
    from: string;
    to: string;
    price: string;
    cargo: string;
    transport: string;
    orderer: string;
    negotiable: string;
    onRequest: string;
    vehicles: string;
  };
  pay: {
    CASH: string;
    CARD: string;
    ON_DELIVERY: string;
    INVOICE: string;
  };
  truck: Record<string, string>;
  power: Record<string, string>;
  load: Record<string, string>;
  pagination: {
    prev: string;
    next: string;
    of: string;
    perPage: string;
    showing: (a: number, b: number, total: number) => string;
  };
  states: {
    loading: string;
    errorTitle: string;
    errorNetwork: string;
    errorUpstream: string;
    retry: string;
    emptyTitle: string;
    emptyBody: string;
    emptyFiltered: string;
  };
  footer: {
    useful: string;
    distance: string;
    versions: string;
    contacts: string;
    about: string;
    contactInfo: string;
    info: string;
    privacy: string;
    sitemap: string;
    mobileApp: string;
    rights: string;
  };
};

export const TRANSLATIONS: Record<Lang, Dict> = {
  uz: {
    brand: "sarbon",
    nav: {
      dashboard: "Dashboard",
      cargo: "Yuklar",
      myCargo: "Mening yuklarim",
      offers: "Takliflar",
      trips: "Reyslar",
      driverManagers: "Haydovchi menejerlari",
      gps: "GPS kuzatuv",
      role: "Yuk menejeri",
    },
    breadcrumbHome: "Bosh sahifa",
    pageTitle: "Barcha yuklar",
    searchPlaceholder: "Yuk qidirish...",
    found: (n) => `${n} ta yuk`,
    filters: {
      fromCity: "Yuklash shahri",
      fromCityPh: "Qayerdan",
      toCity: "Tushirish shahri",
      toCityPh: "Qayerga",
      transport: "Transport",
      transportPh: "Yuk turini tanlang",
      weight: "Og‘irlik (t)",
      min: "Min",
      max: "Max",
      date: "Sana",
      dateStart: "Boshlanish",
      dateEnd: "Tugash",
      favorite: "Sevimli",
      status: "Holat",
      statusSearching: "Qidirilmoqda",
      statusCompleted: "Yakunlangan",
      sort: "Saralash",
      sortNewest: "Yangi (yaratilgan sana bo‘yicha)",
      sortOldest: "Eski (yaratilgan sana bo‘yicha)",
      reset: "Tozalash",
      all: "Barchasi",
    },
    table: {
      from: "Qayerdan olish",
      to: "Qayerga",
      price: "Narx",
      cargo: "Yuk",
      transport: "Transport",
      orderer: "Buyurtmachi",
      negotiable: "Kelishiladi",
      onRequest: "So‘rov bo‘yicha",
      vehicles: "Mashina",
    },
    pay: {
      CASH: "Naqd",
      CARD: "Karta",
      ON_DELIVERY: "Yetkazganda",
      INVOICE: "Hisob-faktura",
    },
    truck: { TENT: "Tentli", REF: "Ref", ISOTHERM: "Izoterm", CONTAINER: "Konteyner", OPEN: "Ochiq", TANK: "Sisterna", BORT: "Bortli" },
    power: { TRUCK: "Yuk mashinasi", TRACTOR: "Tyagach" },
    load: { TOP: "Tepadan", REAR: "Orqadan", BACK: "Orqadan", SIDE: "Yondan", FULL: "To‘liq", CRANE: "Kran", FORKLIFT: "Pogruzchik", OTHER: "Boshqa" },
    pagination: {
      prev: "Oldingi",
      next: "Keyingi",
      of: "dan",
      perPage: "Sahifada",
      showing: (a, b, total) => `${a}–${b} / ${total}`,
    },
    states: {
      loading: "Yuklar yuklanmoqda...",
      errorTitle: "Ma’lumotni yuklab bo‘lmadi",
      errorNetwork: "Tarmoqqa ulanishda xatolik. Internetni tekshiring.",
      errorUpstream: "Server xatolik qaytardi. Birozdan so‘ng urinib ko‘ring.",
      retry: "Qayta urinish",
      emptyTitle: "Yuklar topilmadi",
      emptyBody: "Tanlangan holat bo‘yicha hozircha yuklar yo‘q.",
      emptyFiltered: "Filtr/qidiruv bo‘yicha mos yuk topilmadi.",
    },
    footer: {
      useful: "Foydali",
      distance: "Masofani hisoblash",
      versions: "Versiyalar yangiliklari",
      contacts: "Kontaktlar va tariflar",
      about: "Sarbon tizimi haqida",
      contactInfo: "Kontakt ma’lumotlari",
      info: "Ma’lumot",
      privacy: "Maxfiylik siyosati",
      sitemap: "Sayt xaritasi",
      mobileApp: "Sarbon mobil ilovasi",
      rights: "Sarbon. Barcha huquqlar himoyalangan.",
    },
  },
  ru: {
    brand: "sarbon",
    nav: {
      dashboard: "Дашборд",
      cargo: "Грузы",
      myCargo: "Мои грузы",
      offers: "Предложения",
      trips: "Рейсы",
      driverManagers: "Менеджеры водителей",
      gps: "GPS отслеживание",
      role: "Менеджер груза",
    },
    breadcrumbHome: "Главная",
    pageTitle: "Все грузы",
    searchPlaceholder: "Поиск груза...",
    found: (n) => `грузов: ${n}`,
    filters: {
      fromCity: "Город загрузки",
      fromCityPh: "Откуда",
      toCity: "Город выгрузки",
      toCityPh: "Куда",
      transport: "Транспорт",
      transportPh: "Выберите тип груза",
      weight: "Вес (т)",
      min: "Мин",
      max: "Макс",
      date: "Дата",
      dateStart: "Начало",
      dateEnd: "Конец",
      favorite: "Избранное",
      status: "Статус",
      statusSearching: "В поиске",
      statusCompleted: "Завершён",
      sort: "Сортировка",
      sortNewest: "Новые (по дате создания)",
      sortOldest: "Старые (по дате создания)",
      reset: "Сбросить",
      all: "Все",
    },
    table: {
      from: "Место загрузки",
      to: "Куда",
      price: "Цена",
      cargo: "Груз",
      transport: "Транспорт",
      orderer: "Заказчик",
      negotiable: "Договорная",
      onRequest: "По запросу",
      vehicles: "Машины",
    },
    pay: {
      CASH: "Наличные",
      CARD: "Карта",
      ON_DELIVERY: "При доставке",
      INVOICE: "Счёт-фактура",
    },
    truck: { TENT: "Тент", REF: "Реф", ISOTHERM: "Изотерм", CONTAINER: "Контейнер", OPEN: "Открытый", TANK: "Цистерна", BORT: "Бортовой" },
    power: { TRUCK: "Грузовик", TRACTOR: "Тягач" },
    load: { TOP: "Сверху", REAR: "Сзади", BACK: "Сзади", SIDE: "Сбоку", FULL: "Полная", CRANE: "Кран", FORKLIFT: "Погрузчик", OTHER: "Другое" },
    pagination: {
      prev: "Назад",
      next: "Вперёд",
      of: "из",
      perPage: "На странице",
      showing: (a, b, total) => `${a}–${b} из ${total}`,
    },
    states: {
      loading: "Загрузка грузов...",
      errorTitle: "Не удалось загрузить данные",
      errorNetwork: "Ошибка сети. Проверьте подключение к интернету.",
      errorUpstream: "Сервер вернул ошибку. Повторите попытку позже.",
      retry: "Повторить",
      emptyTitle: "Грузы не найдены",
      emptyBody: "По выбранному статусу пока нет грузов.",
      emptyFiltered: "По фильтру/поиску ничего не найдено.",
    },
    footer: {
      useful: "Полезное",
      distance: "Расчёт расстояния",
      versions: "Новости версий",
      contacts: "Контакты и тарифы",
      about: "О системе Sarbon",
      contactInfo: "Контактная информация",
      info: "Информация",
      privacy: "Политика конфиденциальности",
      sitemap: "Карта сайта",
      mobileApp: "Мобильное приложение Sarbon",
      rights: "Sarbon. Все права защищены.",
    },
  },
  en: {
    brand: "sarbon",
    nav: {
      dashboard: "Dashboard",
      cargo: "Cargo",
      myCargo: "My cargo",
      offers: "Offers",
      trips: "Trips",
      driverManagers: "Driver managers",
      gps: "GPS tracking",
      role: "Cargo manager",
    },
    breadcrumbHome: "Home",
    pageTitle: "All cargo",
    searchPlaceholder: "Search cargo...",
    found: (n) => `${n} cargo`,
    filters: {
      fromCity: "Loading city",
      fromCityPh: "From",
      toCity: "Unloading city",
      toCityPh: "To",
      transport: "Transport",
      transportPh: "Select cargo type",
      weight: "Weight (t)",
      min: "Min",
      max: "Max",
      date: "Date",
      dateStart: "Start",
      dateEnd: "End",
      favorite: "Favorite",
      status: "Status",
      statusSearching: "Searching",
      statusCompleted: "Completed",
      sort: "Sort",
      sortNewest: "Newest (by created date)",
      sortOldest: "Oldest (by created date)",
      reset: "Reset",
      all: "All",
    },
    table: {
      from: "Pickup from",
      to: "Deliver to",
      price: "Price",
      cargo: "Cargo",
      transport: "Transport",
      orderer: "Orderer",
      negotiable: "Negotiable",
      onRequest: "On request",
      vehicles: "Vehicles",
    },
    pay: {
      CASH: "Cash",
      CARD: "Card",
      ON_DELIVERY: "On delivery",
      INVOICE: "Invoice",
    },
    truck: { TENT: "Tented", REF: "Reefer", ISOTHERM: "Isotherm", CONTAINER: "Container", OPEN: "Open", TANK: "Tank", BORT: "Flatbed" },
    power: { TRUCK: "Truck", TRACTOR: "Tractor" },
    load: { TOP: "Top", REAR: "Rear", BACK: "Rear", SIDE: "Side", FULL: "Full", CRANE: "Crane", FORKLIFT: "Forklift", OTHER: "Other" },
    pagination: {
      prev: "Previous",
      next: "Next",
      of: "of",
      perPage: "Per page",
      showing: (a, b, total) => `${a}–${b} of ${total}`,
    },
    states: {
      loading: "Loading cargo...",
      errorTitle: "Couldn’t load the data",
      errorNetwork: "Network error. Check your internet connection.",
      errorUpstream: "The server returned an error. Try again shortly.",
      retry: "Try again",
      emptyTitle: "No cargo found",
      emptyBody: "There is no cargo for the selected status yet.",
      emptyFiltered: "No cargo matches your filters/search.",
    },
    footer: {
      useful: "Useful",
      distance: "Distance calculator",
      versions: "Version news",
      contacts: "Contacts & tariffs",
      about: "About Sarbon",
      contactInfo: "Contact information",
      info: "Information",
      privacy: "Privacy policy",
      sitemap: "Sitemap",
      mobileApp: "Sarbon mobile app",
      rights: "Sarbon. All rights reserved.",
    },
  },
};
