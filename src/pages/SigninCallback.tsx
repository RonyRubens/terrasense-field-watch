
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Processar o callback de autenticação e redirecionar
    const handleCallback = async () => {
      try {
        // O iTwin SDK processará automaticamente o callback
        // Redirecionar de volta para o iTwin Viewer
        setTimeout(() => {
          navigate('/itwin-viewer');
        }, 1000);
      } catch (error) {
        console.error('Erro no callback de autenticação:', error);
        navigate('/itwin-viewer');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terra-600 mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900">
          Processando autenticação...
        </h2>
        <p className="text-gray-600">
          Redirecionando para o iTwin Viewer
        </p>
      </div>
    </div>
  );
};

export default SigninCallback;
