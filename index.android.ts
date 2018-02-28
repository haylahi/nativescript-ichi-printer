
declare module cn {
    export module ichi {
        export module android {
            interface IClientListener {
                onError(id: number, message: string): void;
                onConnected(id: number): void;
                onSended(id: number): void;
                onClosed(id: number): void;
                onData(data: string): void;
            }

            export class ClientListener {
                constructor(implementation: IClientListener);
                onError(id: number, message: string): void;
                onConnected(id: number): void;
                onSended(id: number): void;
                onClosed(id: number): void;
                onData(data: string): void;
            }

            export class Printer {
                constructor(listener: ClientListener, printType: number);
                connect(serverName: string, port: number): number;
                close(): number;
                send(data: Array<number>): number;
                receive(): number;
                static getUsbPrinters(): string;
                static getBlueToothPrinters(): string;
                static getSerialPortPrinters(): string;
            }
        }
    }
}


export class PrintClient {
    private client: cn.ichi.android.Printer;
    public onData: {(data: string): void;};
    public onError: {(id: number, message: string): void;};
    public onConnected: {(id: number): void;};
    public onSended: {(id: number): void;};
    public onClosed: {(id: number): void;};

    constructor(printType?: number) {
        var self = this;
        var listener = new cn.ichi.android.ClientListener({
            onData: (data) => {
                if (self.onData !== null)
                    self.onData(data);
            },
            onError: (id, message) => {
                if (self.onError !== null)
                    self.onError(id, message);
            },
            onConnected: (id) => {
                if (self.onConnected !== null)
                    self.onConnected(id);
            },
            onSended: (id) => {
                if (self.onSended !== null)
                    self.onSended(id);
            },
            onClosed: (id) => {
                if (self.onClosed !== null)
                    self.onClosed(id);
            }
        });
        if (!printType) {
            printType = 0;
        }
        this.client = new cn.ichi.android.Printer(listener, printType);
    }

    public connect(servername: string, port: number): number {
        return this.client.connect(servername, port);
    }

    public close(): number {
        return this.client.close();
    }

    public send(data: Array<number>): number {
        return this.client.send(data);
    }

    public receive(): number {
        return this.client.receive();
    }

    public static getUsbPrinters(): Array<string> {
        let jsonString:string = cn.ichi.android.Printer.getUsbPrinters();
        if (jsonString.length > 0) {
            return JSON.parse(jsonString);
        } else {
            return [];
        }
    }

    public static getBlueToothPrinters(): Array<string> {
        let jsonString:string = cn.ichi.android.Printer.getBlueToothPrinters();
        if (jsonString.length > 0) {
            return JSON.parse(jsonString);
        } else {
            return [];
        }
    }

    public static getSerialPortPrinters(): Array<string> {
        let jsonString:string = cn.ichi.android.Printer.getSerialPortPrinters();
        if (jsonString.length > 0) {
            return JSON.parse(jsonString);
        } else {
            return [];
        }
    }
}


