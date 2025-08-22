# everinbox-test
Microserviço simples usando NestJS e Typeorm.

## Considerações
Tive pouco tempo para fazer o teste então tem algumas coisas faltando como testes, grafana e etc, foi usado NestJS e Typeorm por conta de já ser uma lib conhecida e que tenho um certa facilidade de trabalhar, O projeto usa um Dockerfile padrão e um docker-compose para desenvolvimento local podendo ser usado para os testes.

## Pontos de melhora
- Testes.
- Métricas.
- Observabilidade.

## Funcionalidades
- **POST /api/events**: Recebe uma lista de eventos e armazena sem duplicar.
- **GET /api/stats/daily**: Retorna agregados por dia e por site.
- **Autenticação via API Key**: Protege os endpoints principais.
- **Persistência**: Utiliza PostgreSQL.
- **Observabilidade**: Endpoints de health check e métricas básicas.
- **Extras**: Dockerfile, pronto para deploy em nuvem.

## Como rodar

### Usando Docker (recomendado)
1. Clone o repositório:
   ```bash
   git clone <url-do-repo>
   cd everinbox-test
   ```
2. Suba os serviços:
   ```bash
   docker compose up
   ```

### Localmente
1. Instale as dependências:
   ```bash
   bun install
   ```
2. Configure o banco (PostgreSQL ou SQLite) e o arquivo `.env`:
   ```bash
   cp .env.example .env
   # Edite as variáveis conforme necessário
   ```
3. Inicie o serviço:
   ```bash
   bun run dev
   ```

## Como testar

### Testes manuais
- **Criar eventos:**
  ```bash
  curl -X POST http://localhost:3000/api/events \
    -H "Content-Type: application/json" \
    -H "X-API-Key: test-api-key" \
    -d '{
      "events": [
        {
          "id": "evt_001",
          "type": "sent",
          "email": "user@example.com",
          "site": "site-a.com",
          "timestamp": "2024-01-20T10:30:00Z",
          "metadata": {"campaign_id": "camp_123", "subject": "Welcome Email"}
        }
      ]
    }'
  ```
- **Consultar estatísticas:**
  ```bash
  curl http://localhost:3000/api/stats/daily -H "X-API-Key: test-api-key"
  ```
- **Health check:**
  ```bash
  curl http://localhost:3000/api/health
  ```

## Limitações
- **Autenticação**: Apenas API Key simples, sem expiração ou revogação.
- **Rate limiting**: Não implementado, pode ser necessário em produção.
- **Métricas**: Apenas health check básico, sem Prometheus ou dashboards.
- **Deploy**: Pronto para Docker, mas sem scripts específicos para AWS/Vercel/Render.
- **Validação**: Estrutura robusta, mas sem testes automatizados de integração.

## Exemplo de payload
**POST /api/events**
```json
{
  "events": [
    {
      "id": "evt_001",
      "type": "sent",
      "email": "user@example.com",
      "site": "site-a.com",
      "timestamp": "2024-01-20T10:30:00Z",
      "metadata": {
        "campaign_id": "camp_123",
        "subject": "Welcome Email"
      }
    },
    {
      "id": "evt_002",
      "type": "open",
      "email": "user@example.com",
      "site": "site-a.com",
      "timestamp": "2024-01-20T10:35:00Z",
      "metadata": {
        "ip": "192.168.1.1",
        "user_agent": "Mozilla/5.0..."
      }
    }
  ]
}
```
**Resposta (201):**
```json
{
  "processed": 2,
  "duplicates": 0,
  "errors": []
}
