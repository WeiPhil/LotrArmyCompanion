# -*- mode: python -*-
import PyInstaller.config
PyInstaller.config.CONF['distpath'] = "./dist/windows"

block_cipher = None
specpath = os.path.dirname(os.path.abspath(SPEC))

a = Analysis(['app.py'],
             pathex=['.\\'],
             binaries=[],
             datas=[ ('.\\ressources\\*.ui', 'ressources' ),('.\\ressources\\*.txt', 'ressources' ),('.\\ressources\\*.sql', 'ressources' ),('.\\ressources\\*.ico', 'ressources' )],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='DatabaseHelper',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=False,
          icon= os.path.join(specpath, 'ressources/favicon.ico') )

coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               name='DatabaseHelper',
               icon= os.path.join(specpath, 'ressources/favicon.ico'))
