!macro customInstall
  WriteRegStr HKCR "CenDC" "URL Protocol" ""
  WriteRegStr HKCR "CenDC" "" "URL:CenDC Protocol Handler"
  WriteRegStr HKCR "*\shell\密存加密\command" "" '"$INSTDIR\secretsave.exe" "%1" "1"'
  WriteRegStr HKCR "*\shell\密存解密\command" "" '"$INSTDIR\secretsave.exe" "%1" "2"'
!macroend
!macro customUninstall
  DeleteRegKey HKCR "*\shell\密存加密"
  DeleteRegKey HKCR "*\shell\密存解密"
!macroend