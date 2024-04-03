from py_eureka_client import eureka_client

def register_eureka():
    eureka_client.init(eureka_server="http://localhost:8761/eureka",
                       app_name="ai",
                    vip_adr="http://127.0.0.1:8761/eureka",
                    instance_port=8090) 