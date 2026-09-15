export const categorySlugs = ['pc','mac','smartphone','internet','wifi','peripherals','storage','software','settings','troubleshooting'] as const;
export type CategorySlug = typeof categorySlugs[number];
export const categoryMeta: Record<CategorySlug, { name: string; description: string; problems: string[]; related: CategorySlug[] }> = {
  pc: { name:'PC', description:'Windows PC에서 만나는 성능, 연결, 하드웨어 문제를 해결합니다.', problems:['느린 PC','USB 인식','모니터 연결'], related:['software','peripherals','troubleshooting'] },
  mac: { name:'Mac', description:'macOS 설정과 저장공간, 주변기기 문제를 차분히 점검합니다.', problems:['저장공간 부족','외장 디스크','앱 멈춤'], related:['storage','settings','troubleshooting'] },
  smartphone: { name:'스마트폰', description:'배터리, 연결, 설정처럼 매일 겪는 스마트폰 문제를 다룹니다.', problems:['배터리 소모','앱 알림','충전 문제'], related:['settings','internet','troubleshooting'] },
  internet: { name:'인터넷', description:'공유기와 회선부터 집 안 네트워크의 병목까지 확인합니다.', problems:['인터넷 속도','연결 끊김','공유기 재시작'], related:['wifi','settings','troubleshooting'] },
  wifi: { name:'Wi-Fi', description:'느린 무선 인터넷과 반복되는 연결 끊김을 순서대로 점검합니다.', problems:['속도 저하','신호 약함','자주 끊김'], related:['internet','pc','troubleshooting'] },
  peripherals: { name:'주변기기', description:'Bluetooth, 프린터, 모니터와 USB 기기의 연결 문제를 해결합니다.', problems:['Bluetooth 연결','프린터 오류','USB 인식'], related:['pc','mac','settings'] },
  storage: { name:'저장장치', description:'내장 저장공간과 외장 디스크를 안전하게 관리하는 방법입니다.', problems:['저장공간 부족','디스크 인식','백업'], related:['mac','software','troubleshooting'] },
  software: { name:'소프트웨어', description:'앱과 운영체제에서 발생하는 오류를 기본 확인부터 살펴봅니다.', problems:['앱 멈춤','업데이트 오류','권한 문제'], related:['pc','mac','settings'] },
  settings: { name:'설정', description:'기기와 서비스의 기본 설정을 이해하고 필요한 값만 바꿉니다.', problems:['알림 설정','개인정보 설정','기본 앱'], related:['smartphone','software','troubleshooting'] },
  troubleshooting: { name:'문제해결', description:'증상에서 시작해 원인을 좁히고 해결 순서를 세우는 가이드입니다.', problems:['원인 좁히기','기본 점검','안전한 복구'], related:['pc','mac','internet'] }
};
export const categories = categorySlugs.map((slug) => categoryMeta[slug].name);
export const primaryNav = [{label:'문제 유형',href:'#problems'},{label:'기기별 해결',href:'#devices'},{label:'Tech Diagnostic',href:'#diagnostic'},{label:'소개',href:'/about'}];
export const problemTypes = [
  {label:'Wi-Fi',meta:'연결·속도',detail:'느린 무선 인터넷과 끊김을 점검합니다.',tone:'blue'},
  {label:'인터넷',meta:'공유기·회선',detail:'집 안 네트워크의 병목을 찾습니다.',tone:'green'},
  {label:'스마트폰',meta:'배터리·설정',detail:'매일 쓰는 모바일 문제를 정리합니다.',tone:'orange'},
  {label:'PC',meta:'Windows·하드웨어',detail:'작업을 멈추게 하는 PC 증상을 다룹니다.',tone:'violet'},
  {label:'Mac',meta:'macOS·저장공간',detail:'Mac의 설정과 성능을 차분히 진단합니다.',tone:'red'},
  {label:'Bluetooth',meta:'연결·주변기기',detail:'페어링과 오디오 연결을 확인합니다.',tone:'cyan'}
];
export const devices = ['PC','Mac','스마트폰','인터넷 / Wi-Fi','주변기기'];
export const ga4MeasurementId = 'G-ZL5RD70NKY';
