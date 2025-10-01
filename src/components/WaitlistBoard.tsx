import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import useAppStore from "../store/appStore";


export default function WaitlistBoard() {
    const { waitlist, moveWaitlist, patients } = useAppStore();

    // const onDragEnd = (result: DropResult) => {
    //     if (!result.destination) return;
    //     moveWaitlist(result.source.index, result.destination.index);
    // };
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;
        moveWaitlist(source.index, destination.index);
    };


    return (
        <div className="space-y-3">
            <h3 className="font-semibold">Lista de espera</h3>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="waitlist">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="grid gap-2">
                            {waitlist.map((w, idx) => {
                                const p = patients.find(x => x.id === w.patientId);
                                return (
                                    <Draggable key={w.id} draggableId={w.id} index={idx}>
                                        {(pp) => (
                                            <div ref={pp.innerRef} {...pp.draggableProps} {...pp.dragHandleProps} className="card p-3">
                                                <div className="font-medium">{p?.name}</div>
                                                <div className="text-sm text-slate-600">{w.reason || "—"}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}