import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

print("Translating dashboard widgets and adding data-i18n bindings...")

# Replace hardcoded widget headers with data-i18n wrapped elements
widget_replacements = {
    'CLASS ATTENDANCE': '<span data-i18n="dashAttendance">SINIF KATILIMI</span>',
    'NAP STATUS': '<span data-i18n="dashNapStatus">UYKU DURUMU</span>',
    'MEAL SUCCESS': '<span data-i18n="dashMealSuccess">YEMEK BAŞARISI</span>',
    'MEDICATIONS': '<span data-i18n="dashMedications">BEKLEYEN İLAÇLAR</span>',
    'Little Explorers Class Roster': '<span data-i18n="dashRosterTitle">Little Explorers Sınıf Listesi</span>',
    'Log Entry & Family Sync': '<span data-i18n="dashLogTitle">Bulgu Girişi & Veli Senkronizasyonu</span>',
    'Select Child': '<span data-i18n="dashSelectChild">Öğrenci Seçin</span>',
    'Save Finding & Notify Family →': '<span data-i18n="dashSaveBtn">Bulguyu Kaydet & Veliye Bildir →</span>',
    "Today's Class Schedule": '<span data-i18n="dashScheduleTitle">Bugünün Sınıf Programı</span>',
    'Real-Time Family Activity Feed': '<span data-i18n="dashFeedTitle">Canlı Veli Etkinlik Akışı</span>',
    'Meal (Yemek)': 'Yemek',
    'Nap (Uyku)': 'Uyku',
    'Activity (Etkinlik)': 'Etkinlik',
    '100% Eaten (%100 Yenildi)': '%100 Yenildi (Eaten)'
}

for old_t, new_t in widget_replacements.items():
    html = html.replace(old_t, new_t)

# Add dashboard translation keys to fullDictionary
dict_additions = {
    'en': '''
      dashAttendance: "CLASS ATTENDANCE",
      dashNapStatus: "NAP STATUS",
      dashMealSuccess: "MEAL SUCCESS",
      dashMedications: "PENDING MEDICATIONS",
      dashRosterTitle: "Little Explorers Class Roster",
      dashLogTitle: "Log Entry & Family Sync",
      dashSelectChild: "Select Child",
      dashSaveBtn: "Save Finding & Notify Family →",
      dashScheduleTitle: "Today's Class Schedule",
      dashFeedTitle: "Real-Time Family Activity Feed",
    ''',
    'tr': '''
      dashAttendance: "SINIF KATILIMI",
      dashNapStatus: "UYKU DURUMU",
      dashMealSuccess: "YEMEK BAŞARISI",
      dashMedications: "BEKLEYEN İLAÇLAR",
      dashRosterTitle: "Little Explorers Sınıf Listesi",
      dashLogTitle: "Bulgu Girişi & Veli Senkronizasyonu",
      dashSelectChild: "Öğrenci Seçin",
      dashSaveBtn: "Bulguyu Kaydet & Veliye Bildir →",
      dashScheduleTitle: "Bugünün Sınıf Programı",
      dashFeedTitle: "Canlı Veli Etkinlik Akışı",
    ''',
    'es': '''
      dashAttendance: "ASISTENCIA DE CLASE",
      dashNapStatus: "ESTADO DE SIESTA",
      dashMealSuccess: "ÉXITO DE COMIDA",
      dashMedications: "MEDICAMENTOS PENDIENTES",
      dashRosterTitle: "Lista de Clase Little Explorers",
      dashLogTitle: "Registro y Sincronización Familiar",
      dashSelectChild: "Seleccionar Estudiante",
      dashSaveBtn: "Guardar Hallazgo y Notificar →",
      dashScheduleTitle: "Horario de Hoy",
      dashFeedTitle: "Muro de Actividades en Vivo",
    ''',
    'zh': '''
      dashAttendance: "出勤统计",
      dashNapStatus: "午睡状态",
      dashMealSuccess: "就餐完成率",
      dashMedications: "待用药物",
      dashRosterTitle: "探索者班级花名册",
      dashLogTitle: "日志录入与家庭同步",
      dashSelectChild: "选择学生",
      dashSaveBtn: "保存日志并通知家长 →",
      dashScheduleTitle: "今日课程安排",
      dashFeedTitle: "实时家庭动态流",
    '''
}

if 'dashAttendance:' not in html:
    html = html.replace('navLogin: "Login",', 'navLogin: "Login",\n' + dict_additions['en'].strip())
    html = html.replace('navLogin: "Giriş Yap",', 'navLogin: "Giriş Yap",\n' + dict_additions['tr'].strip())
    html = html.replace('navLogin: "Iniciar Sesión",', 'navLogin: "Iniciar Sesión",\n' + dict_additions['es'].strip())
    html = html.replace('navLogin: "登录",', 'navLogin: "登录",\n' + dict_additions['zh'].strip())

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved translated dashboard widgets!")
