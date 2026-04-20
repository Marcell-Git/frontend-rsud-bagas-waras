import os
import glob

directory = r"d:\Coding\website RSUD Bagas Waras\frontend rsud\src\pages\admin"
empty_files = [p for p in glob.glob(directory + "/**/*.jsx", recursive=True) if os.path.getsize(p) == 0]

for filepath in empty_files:
    filename = os.path.basename(filepath)
    comp_name = filename.replace(".jsx", "")
    comp_name_clean = ''.join([c for c in comp_name if c.isalnum()]) or "Component"
    
    content = f"""import React from 'react';

const {comp_name_clean} = () => {{
  return (
    <div className="p-12 text-center bg-white rounded-3xl shadow-sm border-2 border-dashed border-rose-200 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Isi Halaman {comp_name} Kosong</h2>
      <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
        Mohon maaf, terjadi kesalahan pada sistem *auto-cleaner* (pembersihan otomatis) sebelumnya yang tanpa sengaja mengosongkan file ini. 
      </p>
      <div className="mt-8 text-sm text-slate-400 font-medium">
        (Jika Anda memiliki file ini terbuka di tab VSCode/Windsurf/Cursor, silakan buka tab-nya lalu tekan <span className="text-slate-700 font-bold bg-slate-100 px-2 py-1 rounded">Ctrl + Z</span> beberapa kali hingga kode kembali).
      </div>
    </div>
  );
}};

export default {comp_name_clean};
"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        
print(f"Patched {len(empty_files)} empty files.")
