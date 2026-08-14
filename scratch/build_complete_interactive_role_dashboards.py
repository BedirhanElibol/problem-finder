import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Building Complete Interactive Role Dashboards for all 4 Roles...")

# Build 4 complete role workspace views
all_role_workspaces_html = '''
        <div class="saas-workspace-content">
          
          <!-- ROLE 1: TEACHER PORTAL WORKSPACE (OGRETMEN) -->
          <div id="role-workspace-ogretmen" class="role-workspace-pane space-y-6">
            
            <!-- METRICS GRID -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">SINIF KATILIMI</div>
                <div class="font-heading font-black text-2xl text-white">18 / 18</div>
                <div class="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> %100 Tam Katılım
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">UYKU DURUMU</div>
                <div class="font-heading font-black text-2xl text-white">14 Uykuda</div>
                <div class="text-xs font-bold text-blue-400 mt-1 flex items-center gap-1">
                  <i data-lucide="moon" class="w-3.5 h-3.5"></i> 4 Çocuk Etkinlikte
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">YEMEK BAŞARISI</div>
                <div class="font-heading font-black text-2xl text-white">%95 Yendi</div>
                <div class="text-xs font-bold text-teal-400 mt-1 flex items-center gap-1">
                  <i data-lucide="utensils" class="w-3.5 h-3.5"></i> Öğle Yemeği Tamamlandı
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">BEKLEYEN İLAÇLAR</div>
                <div class="font-heading font-black text-2xl text-amber-400">2 Doz</div>
                <div class="text-xs font-bold text-amber-400 mt-1 flex items-center gap-1">
                  <i data-lucide="clock" class="w-3.5 h-3.5"></i> 14:30 Dozu Yaklaşıyor
                </div>
              </div>
            </div>

            <!-- INTERACTIVE FORMS & TABLES GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- LEFT COLUMN: DATA ENTRY FORM -->
              <div class="lg:col-span-5 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="plus-circle" class="w-5 h-5 text-emerald-400"></i>
                    <span>Hızlı Aktivite & Not Girişi</span>
                  </h3>
                  <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">CANLI FORMU</span>
                </div>

                <form id="form-teacher-activity" onsubmit="handleTeacherActivitySubmit(event)" class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Öğrenci Seçin</label>
                    <select id="teacher-student-select" class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-emerald-400 focus:outline-none">
                      <option value="Mila Yılmaz">Mila Yılmaz (Little Explorers)</option>
                      <option value="Ali Demir">Ali Demir (Little Explorers)</option>
                      <option value="Zeynep Kaya">Zeynep Kaya (Little Explorers)</option>
                      <option value="Efe Çelik">Efe Çelik (Little Explorers)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Aktivite Türü</label>
                    <select id="teacher-activity-type" class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-emerald-400 focus:outline-none">
                      <option value="Yemek">🍲 Yemek (%100 Yendi)</option>
                      <option value="Uyku">😴 Uyku (13:00 - 14:30)</option>
                      <option value="Oyun">🎨 Resim & Eğitici Oyun</option>
                      <option value="İlaç">💊 İlaç Verildi</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Öğretmen Notu / Açıklama</label>
                    <textarea id="teacher-note-text" rows="3" placeholder="Örn: Yemeğini iştahla yedi, arkadaşlarıyla resim yaptı..." class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"></textarea>
                  </div>

                  <button type="submit" class="w-full clean-btn-primary py-3 rounded-xl text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer">
                    <i data-lucide="send" class="w-4 h-4"></i>
                    <span>Kaydet & Veliye Anlık Bildir</span>
                  </button>
                </form>
              </div>

              <!-- RIGHT COLUMN: LIVE CLASSROOM ACTIVITY LOG TABLE -->
              <div class="lg:col-span-7 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="list" class="w-5 h-5 text-emerald-400"></i>
                    <span>Sınıf Günlük Akış Defteri</span>
                  </h3>
                  <span class="text-xs text-slate-400">Son Güncelleme: Anlık</span>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-white/10 text-[11px] font-extrabold text-slate-400 uppercase">
                        <th class="py-2.5 px-3">Öğrenci</th>
                        <th class="py-2.5 px-3">Aktivite</th>
                        <th class="py-2.5 px-3">Saat</th>
                        <th class="py-2.5 px-3">Durum</th>
                        <th class="py-2.5 px-3 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody id="table-teacher-log" class="text-xs font-semibold text-slate-200 divide-y divide-white/5">
                      <tr>
                        <td class="py-3 px-3 font-bold text-white">Mila Yılmaz</td>
                        <td class="py-3 px-3 text-emerald-400">🍲 Öğle Yemeği</td>
                        <td class="py-3 px-3 text-slate-400">12:30</td>
                        <td class="py-3 px-3"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Tamamlandı</span></td>
                        <td class="py-3 px-3 text-right"><button onclick="notifyParent('Mila Yılmaz')" class="text-xs text-emerald-400 hover:underline">Bildirim Gönder</button></td>
                      </tr>
                      <tr>
                        <td class="py-3 px-3 font-bold text-white">Ali Demir</td>
                        <td class="py-3 px-3 text-blue-400">😴 Öğle Uykusu</td>
                        <td class="py-3 px-3 text-slate-400">13:15</td>
                        <td class="py-3 px-3"><span class="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Devam Ediyor</span></td>
                        <td class="py-3 px-3 text-right"><button onclick="notifyParent('Ali Demir')" class="text-xs text-emerald-400 hover:underline">Bildirim Gönder</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          <!-- ROLE 2: CARELOG SENIOR NURSE WORKSPACE (CARELOG) -->
          <div id="role-workspace-carelog" class="role-workspace-pane space-y-6 hidden">
            
            <!-- METRICS GRID -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">TOPLAM SAKİN</div>
                <div class="font-heading font-black text-2xl text-white">24 Sakin</div>
                <div class="text-xs font-bold text-teal-400 mt-1 flex items-center gap-1">
                  <i data-lucide="heart" class="w-3.5 h-3.5"></i> Huzurevi B Blok
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">VİTAL ÖLÇÜM</div>
                <div class="font-heading font-black text-2xl text-white">24 / 24</div>
                <div class="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="activity" class="w-3.5 h-3.5"></i> Sabah Vitals Tamam
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">KRİTİK İLAÇLAR</div>
                <div class="font-heading font-black text-2xl text-amber-400">4 Doz Bekliyor</div>
                <div class="text-xs font-bold text-amber-400 mt-1 flex items-center gap-1">
                  <i data-lucide="pill" class="w-3.5 h-3.5"></i> 15:00 Tansiyon İlacı
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">DOKTOR MUAYENESİ</div>
                <div class="font-heading font-black text-2xl text-white">2 Randevu</div>
                <div class="text-xs font-bold text-blue-400 mt-1 flex items-center gap-1">
                  <i data-lucide="user-check" class="w-3.5 h-3.5"></i> Dr. Selin Geldi
                </div>
              </div>
            </div>

            <!-- VITAL ENTRY FORM & RESIDENTS TABLE -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- VITAL FORM -->
              <div class="lg:col-span-5 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="heart-pulse" class="w-5 h-5 text-teal-400"></i>
                    <span>Yeni Vital & İlaç Girişi</span>
                  </h3>
                  <span class="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/30">REVİR MODÜLÜ</span>
                </div>

                <form id="form-nurse-vitals" onsubmit="handleNurseVitalSubmit(event)" class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Sakin Seçin</label>
                    <select id="nurse-resident-select" class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-teal-400 focus:outline-none">
                      <option value="Ayşe Teyze (Oda 102)">Ayşe Teyze (Oda 102)</option>
                      <option value="Mehmet Amca (Oda 105)">Mehmet Amca (Oda 105)</option>
                      <option value="Fatma Hanım (Oda 108)">Fatma Hanım (Oda 108)</option>
                    </select>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-slate-300 mb-1">Tansiyon (mmHg)</label>
                      <input type="text" id="nurse-bp-input" placeholder="120/80" class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-teal-400 focus:outline-none">
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-300 mb-1">Nabız (bpm)</label>
                      <input type="text" id="nurse-pulse-input" placeholder="72" class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-teal-400 focus:outline-none">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Verilen İlaç & Hemşire Notu</label>
                    <input type="text" id="nurse-note-input" placeholder="Örn: Tansiyon ilacı verildi, durumu stabil..." class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-teal-400 focus:outline-none">
                  </div>

                  <button type="submit" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20 transition-all">
                    <i data-lucide="save" class="w-4 h-4"></i>
                    <span>Vital Değerleri Kaydet</span>
                  </button>
                </form>
              </div>

              <!-- RESIDENTS VITAL TABLE -->
              <div class="lg:col-span-7 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="file-spreadsheet" class="w-5 h-5 text-teal-400"></i>
                    <span>Sakin Vital & Sağlık Takibi</span>
                  </h3>
                  <span class="text-xs text-slate-400">Revir Takip Tablosu</span>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-white/10 text-[11px] font-extrabold text-slate-400 uppercase">
                        <th class="py-2.5 px-3">Sakin / Oda</th>
                        <th class="py-2.5 px-3">Tansiyon</th>
                        <th class="py-2.5 px-3">Nabız</th>
                        <th class="py-2.5 px-3">Durum</th>
                        <th class="py-2.5 px-3 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody id="table-nurse-log" class="text-xs font-semibold text-slate-200 divide-y divide-white/5">
                      <tr>
                        <td class="py-3 px-3 font-bold text-white">Ayşe Teyze (Oda 102)</td>
                        <td class="py-3 px-3 text-teal-400">120/80 mmHg</td>
                        <td class="py-3 px-3 text-slate-300">72 bpm</td>
                        <td class="py-3 px-3"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Stabil / Normal</span></td>
                        <td class="py-3 px-3 text-right"><button onclick="notifyDoctor('Ayşe Teyze')" class="text-xs text-teal-400 hover:underline">Doktora İlet</button></td>
                      </tr>
                      <tr>
                        <td class="py-3 px-3 font-bold text-white">Mehmet Amca (Oda 105)</td>
                        <td class="py-3 px-3 text-amber-400">135/88 mmHg</td>
                        <td class="py-3 px-3 text-slate-300">80 bpm</td>
                        <td class="py-3 px-3"><span class="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Takip Ediliyor</span></td>
                        <td class="py-3 px-3 text-right"><button onclick="notifyDoctor('Mehmet Amca')" class="text-xs text-teal-400 hover:underline">Doktora İlet</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          <!-- ROLE 3: PARENT STREAM WORKSPACE (VELI) -->
          <div id="role-workspace-veli" class="role-workspace-pane space-y-6 hidden">
            
            <!-- METRICS GRID -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">GÜNLÜK RAPOR</div>
                <div class="font-heading font-black text-2xl text-white">Yayında</div>
                <div class="text-xs font-bold text-blue-400 mt-1 flex items-center gap-1">
                  <i data-lucide="check-check" class="w-3.5 h-3.5"></i> Son Rapor: 12:30
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">BUGÜN FOTOĞRAF</div>
                <div class="font-heading font-black text-2xl text-white">6 Fotoğraf</div>
                <div class="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="image" class="w-3.5 h-3.5"></i> Oyun & Resim Saati
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">İLAÇ ONAYI</div>
                <div class="font-heading font-black text-2xl text-emerald-400">1 Onaylandı</div>
                <div class="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Şurup Verildi
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">ÖĞRETMEN MESAJI</div>
                <div class="font-heading font-black text-2xl text-white">1 Yeni</div>
                <div class="text-xs font-bold text-blue-400 mt-1 flex items-center gap-1">
                  <i data-lucide="message-square" class="w-3.5 h-3.5"></i> Melis Öğretmen'den
                </div>
              </div>
            </div>

            <!-- PARENT INSTRUCTION FORM & TIMELINE STREAM -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- PARENT MESSAGE FORM -->
              <div class="lg:col-span-5 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="message-circle" class="w-5 h-5 text-blue-400"></i>
                    <span>Öğretmene / Bakıcıya Not Gönder</span>
                  </h3>
                  <span class="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/30">VELİ PANELİ</span>
                </div>

                <form id="form-parent-note" onsubmit="handleParentNoteSubmit(event)" class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Öğrenci / Yakınınız</label>
                    <input type="text" value="Mila Yılmaz (Little Explorers Sınıfı)" readonly class="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-xs text-slate-400 font-bold">
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Not / İlaç Talimatı</label>
                    <textarea id="parent-note-text" rows="3" placeholder="Örn: Bugün 15:30'da öksürük şurubunu 1 ölçek verebilir misiniz?" class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"></textarea>
                  </div>

                  <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 transition-all">
                    <i data-lucide="send" class="w-4 h-4"></i>
                    <span>Notu Okula İlet</span>
                  </button>
                </form>
              </div>

              <!-- DAILY TIMELINE STREAM -->
              <div class="lg:col-span-7 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="activity" class="w-5 h-5 text-blue-400"></i>
                    <span>Mila'nın Günlük Şeffaf Akışı</span>
                  </h3>
                  <span class="text-xs text-slate-400">Bugünün Akışı</span>
                </div>

                <div class="space-y-3" id="stream-parent-timeline">
                  <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i data-lucide="utensils" class="w-4 h-4"></i>
                    </div>
                    <div class="flex-1 text-xs">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-white">Öğle Yemeği %100 Yendi</span>
                        <span class="text-slate-400 text-[10px]">12:30</span>
                      </div>
                      <p class="text-slate-300 mt-1">Köfte ve sebze çorbasını çok sevdi, iştahla tamamladı.</p>
                    </div>
                  </div>

                  <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i data-lucide="moon" class="w-4 h-4"></i>
                    </div>
                    <div class="flex-1 text-xs">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-white">Öğle Uykusuna Yattı</span>
                        <span class="text-slate-400 text-[10px]">13:00</span>
                      </div>
                      <p class="text-slate-300 mt-1">Masal dinleyerek huzurla uykuya daldı.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- ROLE 4: FACILITY DIRECTOR WORKSPACE (YONETICI) -->
          <div id="role-workspace-yonetici" class="role-workspace-pane space-y-6 hidden">
            
            <!-- METRICS GRID -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">TOPLAM ÖĞRENCİ/SAKİN</div>
                <div class="font-heading font-black text-2xl text-white">120 Aktif</div>
                <div class="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> %98 Doluluk Oranı
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">AYLIK AİDAT TAHSİLATI</div>
                <div class="font-heading font-black text-2xl text-white">%92 Tahsil</div>
                <div class="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="credit-card" class="w-3.5 h-3.5"></i> ₺110,400 Tamamlandı
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">PERSONEL MESAİ</div>
                <div class="font-heading font-black text-2xl text-white">14/14 Görevde</div>
                <div class="text-xs font-bold text-blue-400 mt-1 flex items-center gap-1">
                  <i data-lucide="users" class="w-3.5 h-3.5"></i> Tüm Sınıflar Dolu
                </div>
              </div>

              <div class="clean-glass-card p-5 border border-white/15">
                <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">VELİ MEMNUNİYETİ</div>
                <div class="font-heading font-black text-2xl text-amber-400">%99.8</div>
                <div class="text-xs font-bold text-amber-400 mt-1 flex items-center gap-1">
                  <i data-lucide="star" class="w-3.5 h-3.5"></i> Yüksek Şeffaflık Skoru
                </div>
              </div>
            </div>

            <!-- REGISTRATION FORM & FACILITY OVERVIEW TABLE -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- REGISTRATION FORM -->
              <div class="lg:col-span-5 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="user-plus" class="w-5 h-5 text-amber-400"></i>
                    <span>Yeni Kayıt Ekle (Öğrenci / Sakin)</span>
                  </h3>
                  <span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">YÖNETİM MODÜLÜ</span>
                </div>

                <form id="form-director-register" onsubmit="handleDirectorRegisterSubmit(event)" class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Ad Soyad</label>
                    <input type="text" id="director-name-input" placeholder="Örn: Caner Şahin" required class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none">
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-slate-300 mb-1">Sınıf / Oda</label>
                      <input type="text" id="director-class-input" placeholder="Little Explorers" required class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none">
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-300 mb-1">Aylık Aidat (₺)</label>
                      <input type="text" id="director-fee-input" placeholder="3500" required class="w-full bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none">
                    </div>
                  </div>

                  <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition-all">
                    <i data-lucide="check" class="w-4 h-4"></i>
                    <span>Yeni Kaydı Sisteme Ekle</span>
                  </button>
                </form>
              </div>

              <!-- FACILITY OVERVIEW TABLE -->
              <div class="lg:col-span-7 clean-glass-card p-6 border border-white/15 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                    <i data-lucide="building" class="w-5 h-5 text-amber-400"></i>
                    <span>Kurum Genel Performans & Aidat Tablosu</span>
                  </h3>
                  <span class="text-xs text-slate-400">Yönetici Paneli</span>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-white/10 text-[11px] font-extrabold text-slate-400 uppercase">
                        <th class="py-2.5 px-3">İsim / Şube</th>
                        <th class="py-2.5 px-3">Sınıf</th>
                        <th class="py-2.5 px-3">Aidat</th>
                        <th class="py-2.5 px-3">Durum</th>
                        <th class="py-2.5 px-3 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody id="table-director-log" class="text-xs font-semibold text-slate-200 divide-y divide-white/5">
                      <tr>
                        <td class="py-3 px-3 font-bold text-white">Mila Yılmaz</td>
                        <td class="py-3 px-3 text-slate-300">Little Explorers</td>
                        <td class="py-3 px-3 text-amber-400">₺3,500</td>
                        <td class="py-3 px-3"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Ödendi</span></td>
                        <td class="py-3 px-3 text-right"><button onclick="sendReceipt('Mila Yılmaz')" class="text-xs text-amber-400 hover:underline">Makbuz Gönder</button></td>
                      </tr>
                      <tr>
                        <td class="py-3 px-3 font-bold text-white">Ayşe Teyze</td>
                        <td class="py-3 px-3 text-slate-300">Oda 102</td>
                        <td class="py-3 px-3 text-amber-400">₺4,500</td>
                        <td class="py-3 px-3"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Ödendi</span></td>
                        <td class="py-3 px-3 text-right"><button onclick="sendReceipt('Ayşe Teyze')" class="text-xs text-amber-400 hover:underline">Makbuz Gönder</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

        </div>
'''

# Find <div class="saas-workspace-content"> and replace with all_role_workspaces_html
content_start = html.find('<div class="saas-workspace-content">')
if content_start != -1:
    content_end = html.find('</main>', content_start)
    html = html[:content_start] + all_role_workspaces_html.strip() + '\n\n      ' + html[content_end:]
    print("Replaced all 4 role workspaces with clean, interactive HTML!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved complete interactive role dashboards HTML!")
