import os
import glob

publik_dir = r"d:\Coding\website RSUD Bagas Waras\frontend rsud\src\pages\publik"

files_to_rebuild = []
for p in glob.glob(publik_dir + "/**/*.jsx", recursive=True):
    try:
        if os.path.getsize(p) == 0:
            files_to_rebuild.append(p)
        else:
            with open(p, 'r', encoding='utf-8') as f:
                c = f.read()
            if "Isi Halaman" in c and "Kosong" in c:
                files_to_rebuild.append(p)
    except:
        pass

for p in files_to_rebuild:
    comp_name = os.path.basename(p).replace(".jsx", "")
    comp_clean = ''.join([c for c in comp_name if c.isalnum()])
    
    content = f"""import React from "react";

const {comp_clean} = () => {{
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
          <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Layanan Publik {comp_name} Sedang Diperbarui</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Mohon maaf, halaman layanan publik <b>{comp_name}</b> saat ini sedang dalam proses pemeliharaan darurat. Anda akan segera dapat mengaksesnya kembali.
          </p>
        </div>
      </div>
    </div>
  );
}};

export default {comp_clean};
"""
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Reconstructed {len(files_to_rebuild)} publik components.")
