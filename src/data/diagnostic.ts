export const diagnosticAreas = [
  { id:'pc', label:'PC', detail:'Windows PC의 성능과 연결 문제' },
  { id:'mac', label:'Mac', detail:'macOS와 저장공간 문제' },
  { id:'smartphone', label:'스마트폰', detail:'iPhone·Android의 일상 문제' },
  { id:'network', label:'인터넷 / Wi-Fi', detail:'속도와 연결 끊김 문제' },
  { id:'peripherals', label:'주변기기', detail:'화면·USB·프린터·Bluetooth' },
  { id:'software', label:'소프트웨어', detail:'프로그램 응답과 실행 문제' }
] as const;
export type DiagnosticArea = typeof diagnosticAreas[number]['id'];
export type DiagnosticFlow = { id:string; label:string; guideSlug:string; question:string; answers:string[]; firstCheck:string; problemType:string };
export const diagnosticFlows: Record<DiagnosticArea, DiagnosticFlow[]> = {
  pc: [
    {id:'pc-slow',label:'컴퓨터가 느리다',guideSlug:'pc-running-slow',question:'PC를 재부팅한 뒤에도 느린가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'재부팅 후에도 느린지 확인하고 작업 관리자에서 자원 사용량을 살펴보세요.',problemType:'PC 성능 저하'},
    {id:'pc-app',label:'프로그램이 멈춘다',guideSlug:'app-not-responding',question:'다른 프로그램도 함께 멈추나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'작업을 저장할 수 있는지 먼저 확인하고, 앱 하나의 문제인지 시스템 전체인지 나누세요.',problemType:'프로그램 응답 없음'},
    {id:'pc-usb',label:'USB 장치가 인식되지 않는다',guideSlug:'usb-not-recognized',question:'다른 USB 포트에서도 같은가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'USB 허브를 제외하고 다른 포트에 직접 연결해 보세요.',problemType:'USB 인식 실패'},
    {id:'pc-monitor',label:'모니터 화면이 나오지 않는다',guideSlug:'monitor-no-signal',question:'모니터의 입력 소스가 연결한 포트와 같은가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'모니터 입력 소스와 케이블 양쪽 연결을 먼저 확인하세요.',problemType:'화면 신호 없음'}
  ],
  mac: [
    {id:'mac-storage',label:'저장공간이 부족하다',guideSlug:'mac-storage-full',question:'저장공간 화면에서 큰 항목을 확인했나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'시스템 설정의 저장 공간에서 큰 항목과 휴지통을 확인하세요.',problemType:'Mac 저장공간 부족'},
    {id:'mac-app',label:'프로그램이 멈춘다',guideSlug:'app-not-responding',question:'작업 내용이 저장되었거나 복구 가능한가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'강제 종료 전에 저장 여부를 확인하고 다른 앱도 반응하는지 살펴보세요.',problemType:'프로그램 응답 없음'},
    {id:'mac-monitor',label:'모니터 신호가 없다',guideSlug:'monitor-no-signal',question:'다른 케이블이나 포트에서 확인했나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'입력 소스와 케이블을 확인한 뒤 다른 포트에서 테스트하세요.',problemType:'화면 신호 없음'}
  ],
  smartphone: [
    {id:'phone-storage',label:'저장공간이 부족하다',guideSlug:'smartphone-storage-full',question:'삭제할 사진과 파일이 백업되었나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'저장공간 화면에서 큰 항목을 확인하고 백업 상태를 먼저 살펴보세요.',problemType:'스마트폰 저장공간 부족'},
    {id:'phone-bluetooth',label:'Bluetooth 연결이 되지 않는다',guideSlug:'bluetooth-not-connecting',question:'주변기기를 다른 기기에 연결해 보았나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'주변기기 전원·배터리·페어링 모드를 확인하세요.',problemType:'Bluetooth 연결 실패'}
  ],
  network: [
    {id:'network-wifi-slow',label:'Wi-Fi 속도가 느리다',guideSlug:'wifi-slow',question:'다른 기기에서도 속도가 느린가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'한 기기만의 문제인지 모든 기기의 문제인지 먼저 나누세요.',problemType:'Wi-Fi 속도 저하'},
    {id:'network-disconnect',label:'인터넷 연결이 자주 끊긴다',guideSlug:'internet-keeps-disconnecting',question:'여러 기기에서 동시에 끊기나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'끊김의 범위와 시간을 기록하고 공유기·회선 문제인지 구분하세요.',problemType:'인터넷 연결 반복 끊김'}
  ],
  peripherals: [
    {id:'device-monitor',label:'모니터에 신호가 없다',guideSlug:'monitor-no-signal',question:'입력 소스가 연결한 포트와 같은가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'모니터 입력 소스와 영상 케이블을 확인하세요.',problemType:'화면 신호 없음'},
    {id:'device-usb',label:'USB 장치가 인식되지 않는다',guideSlug:'usb-not-recognized',question:'USB 허브 없이 직접 연결했나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'다른 포트에 직접 연결하고 다른 컴퓨터에서도 테스트하세요.',problemType:'USB 인식 실패'},
    {id:'device-printer',label:'프린터가 오프라인이다',guideSlug:'printer-offline',question:'컴퓨터와 프린터가 같은 네트워크인가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'프린터 전원·네트워크와 인쇄 대기열을 확인하세요.',problemType:'프린터 오프라인'},
    {id:'device-bluetooth',label:'Bluetooth 장치가 연결되지 않는다',guideSlug:'bluetooth-not-connecting',question:'주변기기가 페어링 모드인가요?',answers:['예','아니요','확인하지 않음'],firstCheck:'전원과 페어링 모드를 확인하고 기기 가까이에서 검색하세요.',problemType:'Bluetooth 연결 실패'}
  ],
  software: [
    {id:'software-app',label:'프로그램이 멈추거나 응답하지 않는다',guideSlug:'app-not-responding',question:'저장되지 않은 작업이 있나요?',answers:['예','아니요','확인하지 않음'],firstCheck:'잠시 기다린 뒤 저장 여부를 확인하고 앱 하나의 문제인지 나누세요.',problemType:'프로그램 응답 없음'}
  ]
};
