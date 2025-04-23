import LoginForm from "./LoginForm";

const LoginContainer = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/assets/bg_glass.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
        height: '100vh', 
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div 
              className="card card-custom p-2 text-white text-light shadow-lg"
              style={{ 
              backgroundColor: "rgba(1, 2, 14, 0.8)",
              backdropFilter: "blur(8px)",
              borderRadius: "12px"
              }}
            >
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h2 className="card-title mt-3">
                    <strong>Iniciar sesión</strong>
                  </h2>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
