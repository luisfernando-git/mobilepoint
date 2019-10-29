window.sqlitePlugin = {
    openDatabase : function(p) {
        if(!p) p = {};
        if(!p.name) p.name = 'mobilepoint.db';
        if(!p.version) p.version = '1.0';
        if(!p.description) p.description = 'MobilePointDB';
        if(!p.size) p.size = -1;
        return window.openDatabase(p.name, p.version, p.description, p.size);
    },
    deleteDatabase: function(p, successcb, errorcb) {
        errorcb('This feature only works on the native device. On the web delete your database via settings.')
    }
}