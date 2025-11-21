"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertTriangle, Info, Loader2 } from "lucide-react";

/**
 * Componente de demonstração do Sonner Toast
 * Use este componente para testar as notificações
 * 
 * Para usar em qualquer página:
 * import ToastDemo from "@/components/toast-demo";
 * <ToastDemo />
 */
export default function ToastDemo() {
  const showSuccessToast = () => {
    toast.success("Operação realizada com sucesso!", {
      description: "Seus dados foram salvos com segurança",
      duration: 3000,
    });
  };

  const showErrorToast = () => {
    toast.error("Algo deu errado!", {
      description: "Não foi possível completar a operação",
      duration: 4000,
    });
  };

  const showWarningToast = () => {
    toast.warning("Atenção necessária!", {
      description: "Verifique os dados antes de continuar",
      duration: 3000,
    });
  };

  const showInfoToast = () => {
    toast.info("Nova atualização disponível", {
      description: "Clique aqui para ver as novidades",
      duration: 3000,
    });
  };

  const showPromiseToast = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve({ name: "Produto X" }), 2000);
    });

    toast.promise(promise, {
      loading: "Processando...",
      success: (data: any) => `${data.name} foi adicionado!`,
      error: "Falha ao processar",
    });
  };

  const showActionToast = () => {
    toast.success("Item deletado com sucesso!", {
      action: {
        label: "Desfazer",
        onClick: () => toast.info("Ação desfeita!"),
      },
      duration: 5000,
    });
  };

  const showCustomToast = () => {
    toast.custom((t) => (
      <div className="glass p-4 rounded-xl border-2 border-purple-500/50 shadow-2xl max-w-md">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-600/20 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-100">Toast Customizado!</h3>
            <p className="text-sm text-slate-400 mt-1">
              Este é um toast completamente customizado com HTML personalizado
            </p>
            <button
              onClick={() => toast.dismiss(t)}
              className="mt-2 text-xs text-purple-400 hover:text-purple-300"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔔 Demonstração de Notificações Sonner
        </CardTitle>
        <CardDescription>
          Clique nos botões abaixo para testar os diferentes tipos de notificações
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Success */}
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <div className="flex-1">
            <p className="font-medium text-slate-200">Success Toast</p>
            <p className="text-sm text-slate-400">Notificação de sucesso verde</p>
          </div>
          <Button onClick={showSuccessToast} variant="outline" size="sm">
            Testar
          </Button>
        </div>

        {/* Error */}
        <div className="flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-500" />
          <div className="flex-1">
            <p className="font-medium text-slate-200">Error Toast</p>
            <p className="text-sm text-slate-400">Notificação de erro vermelha</p>
          </div>
          <Button onClick={showErrorToast} variant="outline" size="sm">
            Testar
          </Button>
        </div>

        {/* Warning */}
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <div className="flex-1">
            <p className="font-medium text-slate-200">Warning Toast</p>
            <p className="text-sm text-slate-400">Notificação de aviso laranja</p>
          </div>
          <Button onClick={showWarningToast} variant="outline" size="sm">
            Testar
          </Button>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-500" />
          <div className="flex-1">
            <p className="font-medium text-slate-200">Info Toast</p>
            <p className="text-sm text-slate-400">Notificação informativa azul</p>
          </div>
          <Button onClick={showInfoToast} variant="outline" size="sm">
            Testar
          </Button>
        </div>

        {/* Promise */}
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-purple-500" />
          <div className="flex-1">
            <p className="font-medium text-slate-200">Promise Toast</p>
            <p className="text-sm text-slate-400">Loading → Success/Error</p>
          </div>
          <Button onClick={showPromiseToast} variant="outline" size="sm">
            Testar
          </Button>
        </div>

        {/* With Action */}
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <div className="flex-1">
            <p className="font-medium text-slate-200">Toast com Ação</p>
            <p className="text-sm text-slate-400">Inclui botão de desfazer</p>
          </div>
          <Button onClick={showActionToast} variant="outline" size="sm">
            Testar
          </Button>
        </div>

        {/* Custom */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
          <div className="flex-1">
            <p className="font-medium text-slate-200">Toast Customizado</p>
            <p className="text-sm text-slate-400">HTML totalmente personalizado</p>
          </div>
          <Button onClick={showCustomToast} variant="outline" size="sm">
            Testar
          </Button>
        </div>

        {/* Clear All */}
        <div className="pt-4 border-t border-slate-700">
          <Button 
            onClick={() => toast.dismiss()} 
            variant="destructive" 
            className="w-full"
          >
            Limpar Todas as Notificações
          </Button>
        </div>

        {/* Code Example */}
        <div className="pt-4">
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Exemplo de Código:</h4>
          <pre className="bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
            <code className="text-green-400">{`import { toast } from "sonner";

// Success
toast.success("Sucesso!", {
  description: "Descrição aqui",
  duration: 3000,
});

// Error
toast.error("Erro!", {
  description: "Mensagem de erro",
});

// Promise
toast.promise(asyncFunction, {
  loading: "Carregando...",
  success: "Sucesso!",
  error: "Erro!",
});`}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

