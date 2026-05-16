export const LANGS = ["uz", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

type Dict = {
  brand: string;
  brandSub: string;
  pageTitle: string;
  pageSubtitle: (n: number) => string;
  filters: {
    title: string;
    status: string;
    statusSearching: string;
    statusCompleted: string;
    sort: string;
    sortNewest: string;
    sortOldest: string;
    search: string;
    searchPlaceholder: string;
    reset: string;
  };
  table: {
    cargo: string;
    route: string;
    vehicle: string;
    payment: string;
    posted: string;
    weight: string;
    volume: string;
    vehicles: string;
    prepay: string;
    negotiable: string;
    onRequest: string;
    asap: string;
    twoDrivers: string;
  };
  pagination: {
    prev: string;
    next: string;
    page: string;
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
    emptyAfterFilter: string;
  };
};

export const TRANSLATIONS: Record<Lang, Dict> = {
  uz: {
    brand: "SARBON",
    brandSub: "Dispetcher paneli",
    pageTitle: "Yuklar ro‘yxati",
    pageSubtitle: (n) => `${n} ta yuk topildi`,
    filters: {
      title: "Filtrlar",
      status: "Holat",
      statusSearching: "Qidirilmoqda",
      statusCompleted: "Yakunlangan",
      sort: "Saralash",
      sortNewest: "Avval yangilari",
      sortOldest: "Avval eskilari",
      search: "Qidiruv",
      searchPlaceholder: "Shahar, yuk turi yoki kontakt...",
      reset: "Tozalash",
    },
    table: {
      cargo: "Yuk",
      route: "Yo‘nalish",
      vehicle: "Transport",
      payment: "To‘lov",
      posted: "Joylangan",
      weight: "Vazn",
      volume: "Hajm",
      vehicles: "Mashina",
      prepay: "Oldindan",
      negotiable: "Kelishiladi",
      onRequest: "So‘rov bo‘yicha",
      asap: "Imkon qadar tez",
      twoDrivers: "2 haydovchi",
    },
    pagination: {
      prev: "Oldingi",
      next: "Keyingi",
      page: "Sahifa",
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
      emptyAfterFilter: "Qidiruv bo‘yicha mos yuk topilmadi.",
    },
  },
  ru: {
    brand: "SARBON",
    brandSub: "Панель диспетчера",
    pageTitle: "Список грузов",
    pageSubtitle: (n) => `Найдено грузов: ${n}`,
    filters: {
      title: "Фильтры",
      status: "Статус",
      statusSearching: "В поиске",
      statusCompleted: "Завершён",
      sort: "Сортировка",
      sortNewest: "Сначала новые",
      sortOldest: "Сначала старые",
      search: "Поиск",
      searchPlaceholder: "Город, тип груза или контакт...",
      reset: "Сбросить",
    },
    table: {
      cargo: "Груз",
      route: "Маршрут",
      vehicle: "Транспорт",
      payment: "Оплата",
      posted: "Размещён",
      weight: "Вес",
      volume: "Объём",
      vehicles: "Машины",
      prepay: "Аванс",
      negotiable: "Договорная",
      onRequest: "По запросу",
      asap: "Как можно скорее",
      twoDrivers: "2 водителя",
    },
    pagination: {
      prev: "Назад",
      next: "Вперёд",
      page: "Страница",
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
      emptyAfterFilter: "По вашему запросу ничего не найдено.",
    },
  },
  en: {
    brand: "SARBON",
    brandSub: "Dispatcher console",
    pageTitle: "Cargo list",
    pageSubtitle: (n) => `${n} cargo loads found`,
    filters: {
      title: "Filters",
      status: "Status",
      statusSearching: "Searching",
      statusCompleted: "Completed",
      sort: "Sort",
      sortNewest: "Newest first",
      sortOldest: "Oldest first",
      search: "Search",
      searchPlaceholder: "City, cargo type or contact...",
      reset: "Reset",
    },
    table: {
      cargo: "Cargo",
      route: "Route",
      vehicle: "Vehicle",
      payment: "Payment",
      posted: "Posted",
      weight: "Weight",
      volume: "Volume",
      vehicles: "Vehicles",
      prepay: "Prepay",
      negotiable: "Negotiable",
      onRequest: "On request",
      asap: "ASAP",
      twoDrivers: "2 drivers",
    },
    pagination: {
      prev: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
      perPage: "Per page",
      showing: (a, b, total) => `${a}–${b} of ${total}`,
    },
    states: {
      loading: "Loading cargo loads...",
      errorTitle: "Couldn’t load the data",
      errorNetwork: "Network error. Check your internet connection.",
      errorUpstream: "The server returned an error. Try again shortly.",
      retry: "Try again",
      emptyTitle: "No cargo found",
      emptyBody: "There are no cargo loads for the selected status yet.",
      emptyAfterFilter: "No cargo matches your search.",
    },
  },
};
