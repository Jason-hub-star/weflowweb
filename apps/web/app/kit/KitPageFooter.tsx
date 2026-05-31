export function KitPageFooter() {
  return (
    <footer className="border-line mt-24 border-t pt-8">
      <p className="text-small text-muted ko-tight">
        새 컴포넌트 추가 시 이 페이지에 카드를 등재해주세요 (AGENTS Hard Rule 12 / DEC-045).
      </p>
      <p className="text-small text-muted ko-tight mt-1">
        카탈로그 위치: <code className="text-text font-mono">apps/web/app/kit/page.tsx</code> ·
        헬퍼: <code className="text-text font-mono">components/kit/KitCard.tsx</code>
      </p>
    </footer>
  );
}
