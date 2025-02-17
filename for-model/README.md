# 

## Model
www.msaez.io/{{URL}}

## Before Running Services
### Make sure there is a Kafka server running
```
cd kafka
docker-compose up
```
- Check the Kafka messages:
```
cd infra
docker-compose exec -it kafka /bin/bash
cd /bin
./kafka-console-consumer --bootstrap-server localhost:9092 --topic
```

## Run the backend micro-services
See the README.md files inside the each microservices directory:

{{#boundedContexts}}
- {{name}}
{{/boundedContexts}}


## Run API Gateway (Spring Gateway)
```
cd gateway
mvn spring-boot:run
```

## Test by API
{{#boundedContexts}}
- {{name}}
```
{{#aggregates}}
 http :8088/{{namePlural}} {{#aggregateRoot.fieldDescriptors}}{{#checkDefaultType className}}{{nameCamelCase}}="{{name}}"{{/checkDefaultType}}{{^checkDefaultType className}}{{#createEnum className ../aggregateRoot.entities.relations}}{{/createEnum}}{{#createVO className ../aggregateRoot.entities.relations}}{{/createVO}}{{/checkDefaultType}}{{/aggregateRoot.fieldDescriptors}}
{{/aggregates}}
```
{{/boundedContexts}}


## Run the frontend
```
cd frontend
npm i
npm run serve
```

## Test by UI
Open a browser to localhost:8088

## Required Utilities

- httpie (alternative for curl / POSTMAN) and network utils
```
sudo apt-get update
sudo apt-get install net-tools
sudo apt install iputils-ping
pip install httpie
```

- kubernetes utilities (kubectl)
```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

- aws cli (aws)
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

- eksctl 
```
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
```

<function>
window.$HandleBars.registerHelper('checkDefaultType', function (type, options) {
    if(type === 'String' || type === 'Integer' || type === 'Long' || type === 'Double' || type === 'Float' || type === 'Boolean' || type === 'Date' || type === 'DateTime') {
        return options.fn(this);
    }
    return options.inverse(this);
});

window.$HandleBars.registerHelper('createEnum', function (type, enumField) {
    if(enumField){
        for(var i = 0; i < enumField.length; i++){
            if(enumField[i] && enumField[i].targetElement){
                var enumValue = enumField[i].targetElement
                if(type === enumField[i].targetElement.namePascalCase && enumField[i].targetElement._type.endsWith('enum')){
                    if(enumField[i].targetElement.items){
                        return `${enumValue.namePascalCase} = "${enumValue.items[0].value}"`
                    }
                }
            }
        }
    }
});

window.$HandleBars.registerHelper('createVO', function (type, voField) {
    if(voField){
        for(var i = 0; i < voField.length; i++){
            if(voField[i] && voField[i].targetElement){
                var voValue = voField[i].targetElement
                if(type === voField[i].targetElement.namePascalCase && voField[i].targetElement.isVO){
                    if(voField[i].targetElement.fieldDescriptors){
                        const fields = voField[i].targetElement.fieldDescriptors
                            .map(field => {
                                let defaultValue;
                                switch(field.className.toLowerCase()) {
                                    case 'string':
                                        defaultValue = field.nameCamelCase;
                                        break;
                                    case 'integer':
                                    case 'long':
                                    case 'double':
                                    case 'float':
                                        defaultValue = '0';
                                        break;
                                    case 'boolean':
                                        defaultValue = 'false';
                                        break;
                                    case 'date':
                                        defaultValue = 'null';
                                        break;
                                }
                                return `"${field.nameCamelCase}": ${defaultValue}`;
                            })
                            .join(', ');
                        return `${voValue.namePascalCase} := '{${fields}}'`;
                    }
                }
            }
        }
    }
});
</function>