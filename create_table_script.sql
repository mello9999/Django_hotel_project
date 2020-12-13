CREATE TABLE "Card_info" (
    card_id       integer,
    card_name     character varying(100),
    expired_date  date,
    CONSTRAINT "PK_card_info" PRIMARY KEY (card_id)
);

CREATE TABLE "Feedback"(
    account_id  integer,
    date        date,
    rating      character varying(100),
    description character varying(100),
    CONSTRAINT "PK_feedback" PRIMARY KEY (account_id)
);

CREATE TABLE "Role"(
    role_name   character varying(100),
    description character varying(100),
    CONSTRAINT "PK_role" PRIMARY KEY (role_name)
);

CREATE TABLE "Account"(
    account_id integer,
    email      character varying(100),
    password   character varying(100),
    first_name character varying(100),
    phone_no   integer,
    role_name  character varying(100),
    CONSTRAINT "PK_account" PRIMARY KEY (account_id),
    CONSTRAINT "FK_106" FOREIGN KEY (role_name) REFERENCES "Role"(role_name)
);

CREATE INDEX "fkIdx_106" ON "Account"(role_name);

CREATE TABLE "Room"(
    room_id     integer,
    room_type   character varying(100),
    room_status boolean,
    room_rating float,
    price       money,
    CONSTRAINT "PK_room" PRIMARY KEY (room_id)
);

CREATE TABLE "Reservation"(
    booking_id     integer,
    account_id     integer,
    check_in       date,
    check_out      date,
    period         integer,
    booking_type   character varying(100),
    room_id        integer,
    no_extra_bed   integer,
    no_adult       integer,
    no_children    integer,
    booking_status character varying(100),
    CONSTRAINT "PK_reservation" PRIMARY KEY (booking_id),
    CONSTRAINT "FK_117" FOREIGN KEY (account_id) REFERENCES "Account" (account_id),
    CONSTRAINT "FK_120" FOREIGN KEY (room_id) REFERENCES "Room" (room_id)
);

CREATE INDEX "fkIdx_117" ON "Reservation"(account_id);

CREATE INDEX "fkIdx_120" ON "Reservation"(room_id);

CREATE TABLE "Invoice"(
    invoice_no   character varying(100),
    invoice_date date,
    booking_id   integer,
    account_id   integer,
    due_date     date,
    total        money,
    vat          money,
    amount_due   money, 
    CONSTRAINT "PK_invoice" PRIMARY KEY (invoice_no),
    CONSTRAINT "FK_129" FOREIGN KEY (booking_id)
        REFERENCES "Reservation"(booking_id),
    CONSTRAINT "FK_1999" FOREIGN KEY (account_id)
        REFERENCES "Account" (account_id)
);

CREATE INDEX "fkIdx_129" ON "Invoice"(booking_id);
CREATE INDEX "fkIdx_1999" ON "Invoice"(account_id);

CREATE TABLE "Invoice_line_item"(
    invoice_no     character varying(100),
    booking_id     integer ,
    quantity       integer ,
    unit_price     integer ,
    extended_price money ,
    CONSTRAINT "PK_invoice_line_item" PRIMARY KEY (invoice_no),
    CONSTRAINT "FK_132" FOREIGN KEY (booking_id) 
        REFERENCES "Reservation" (booking_id)
);

CREATE INDEX "fkIdx_132" ON "Invoice_line_item"(booking_id);

CREATE TABLE "Receipt"(
    receipt_no        character varying(100),
    receipt_date      date,
    booking_id        integer,
    payment_method    character varying(100),
    payment_reference character varying(100),
    remarks           character varying(100),
    total_received    money,
    CONSTRAINT "PK_receipt" PRIMARY KEY (receipt_no),
    CONSTRAINT "FK_135" FOREIGN KEY (booking_id) 
        REFERENCES "Reservation"(booking_id)
);

CREATE INDEX "fkIdx_135" ON "Receipt"(booking_id);

CREATE TABLE "Receipt_line_item"(
    receipt_no       integer,
    invoice_no       character varying(100),
    amount_paid_here character varying(100),
    CONSTRAINT "PK_receipt_line_item" PRIMARY KEY (receipt_no),
    CONSTRAINT "FK_138" FOREIGN KEY (invoice_no) 
        REFERENCES "Invoice" (invoice_no)
);

CREATE INDEX "fkIdx_138" ON "Receipt_line_item"(invoice_no);

CREATE TABLE "Room_service"(
    service_no     integer,
    booking_id     integer,
    account_id     integer,
    service_type   character varying(100),
    service_cost   money,
    service_rating integer,
    CONSTRAINT "PK_room_service" PRIMARY KEY (service_no),
    CONSTRAINT "FK_123" FOREIGN KEY (booking_id) 
        REFERENCES "Reservation" (booking_id),
    CONSTRAINT "FK_126" FOREIGN KEY (account_id) 
        REFERENCES "Account" (account_id)
);

CREATE INDEX "fkIdx_123" ON "Room_service"(booking_id);

CREATE INDEX "fkIdx_126" ON "Room_service"(account_id);

CREATE TABLE "Room_type"(
    type   character varying(100),
    number integer,
    CONSTRAINT "PK_room_type" PRIMARY KEY (type)
);
